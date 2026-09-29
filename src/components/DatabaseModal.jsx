import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  Table, 
  RefreshCw, 
  Users, 
  ShoppingBag, 
  Award, 
  Clock, 
  Search, 
  Copy, 
  Check, 
  CheckCircle2, 
  FileCode,
  ShieldCheck,
  Server
} from 'lucide-react';
import { api } from '../services/api';

export default function DatabaseModal({ onClose }) {
  const [activeTable, setActiveTable] = useState('certificates'); // 'users' | 'orders' | 'certificates' | 'schema'
  const [dbData, setDbData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedSchema, setCopiedSchema] = useState(false);

  const fetchDatabaseOverview = async () => {
    setIsLoading(true);
    try {
      const data = await api.getDatabaseOverview();
      if (data && data.success) {
        setDbData(data);
      }
    } catch (e) {
      console.warn('DB overview fetch error:', e);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchDatabaseOverview();
  }, []);

  const schemaSQL = `-- ========================================================
-- CodeVidya CS Academy - MySQL Database Schema
-- Database: codevidya_db
-- ========================================================

CREATE DATABASE IF NOT EXISTS \`codevidya_db\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`codevidya_db\`;

-- 1. Users Table (Authentication & Security)
CREATE TABLE IF NOT EXISTS \`users\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`name\` VARCHAR(100) NOT NULL,
    \`email\` VARCHAR(150) NOT NULL UNIQUE,
    \`password_hash\` VARCHAR(255) NOT NULL,
    \`role\` ENUM('student', 'instructor', 'admin') DEFAULT 'student',
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX \`idx_user_email\` (\`email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Orders & Practice Sheet Unlocks
CREATE TABLE IF NOT EXISTS \`orders\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`order_id\` VARCHAR(50) NOT NULL UNIQUE,
    \`user_email\` VARCHAR(150) NOT NULL,
    \`course_id\` VARCHAR(50) NOT NULL,
    \`amount\` DECIMAL(10, 2) NOT NULL,
    \`status\` ENUM('PENDING', 'SUCCESS', 'FAILED') DEFAULT 'SUCCESS',
    \`payment_method\` VARCHAR(50) DEFAULT 'UPI',
    \`coupon_applied\` VARCHAR(30) NULL,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX \`idx_order_user\` (\`user_email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Verified Certificates Table
CREATE TABLE IF NOT EXISTS \`certificates\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`cert_id\` VARCHAR(50) NOT NULL UNIQUE,
    \`student_name\` VARCHAR(150) NOT NULL,
    \`course_id\` VARCHAR(50) NOT NULL,
    \`course_title\` VARCHAR(200) NOT NULL,
    \`score_percentage\` INT NOT NULL,
    \`issue_date\` VARCHAR(50) NOT NULL,
    \`hash_signature\` VARCHAR(64) NOT NULL,
    \`status\` ENUM('VERIFIED_ACTIVE', 'REVOKED') DEFAULT 'VERIFIED_ACTIVE',
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX \`idx_cert_id\` (\`cert_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`;

  const copySchema = () => {
    navigator.clipboard.writeText(schemaSQL);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const currentRecords = dbData?.tables?.[activeTable]?.records || [];
  const filteredRecords = currentRecords.filter((rec) => {
    if (!searchTerm) return true;
    const str = JSON.stringify(rec).toLowerCase();
    return str.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-white max-h-[92vh] flex flex-col">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Live Database Explorer
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  MySQL Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Database: <code className="text-indigo-300 font-mono">codevidya_db</code> • Port: <code className="text-slate-300 font-mono">3306</code> • Engine: <strong className="text-white">{dbData?.databaseType || 'Relational MySQL Driver'}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchDatabaseOverview}
              disabled={isLoading}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Tables</span>
            </button>
          </div>
        </div>

        {/* Table Selector Tabs */}
        <div className="flex items-center gap-2 my-4 overflow-x-auto pb-1 border-b border-slate-800 scrollbar-none">
          <button
            onClick={() => { setActiveTable('certificates'); setSearchTerm(''); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTable === 'certificates'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>certificates ({dbData?.tables?.certificates?.count || 4})</span>
          </button>

          <button
            onClick={() => { setActiveTable('orders'); setSearchTerm(''); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTable === 'orders'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span>orders ({dbData?.tables?.orders?.count || 2})</span>
          </button>

          <button
            onClick={() => { setActiveTable('users'); setSearchTerm(''); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTable === 'users'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4 text-sky-400" />
            <span>users ({dbData?.tables?.users?.count || 2})</span>
          </button>

          <button
            onClick={() => { setActiveTable('schema'); setSearchTerm(''); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTable === 'schema'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileCode className="w-4 h-4 text-purple-400" />
            <span>schema.sql (DDL Script)</span>
          </button>
        </div>

        {/* Search Bar (if not viewing schema) */}
        {activeTable !== 'schema' && (
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search records in table '${activeTable}'...`}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}

        {/* Content Viewer */}
        <div className="flex-1 overflow-auto rounded-2xl bg-slate-950 border border-slate-800 p-3 min-h-[320px]">
          {activeTable === 'schema' ? (
            <div className="relative">
              <button
                onClick={copySchema}
                className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSchema ? 'Copied SQL' : 'Copy SQL Script'}</span>
              </button>
              <pre className="font-mono text-xs text-emerald-300 leading-relaxed overflow-x-auto p-4">
                {schemaSQL}
              </pre>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {filteredRecords.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No records matching filter in table <code className="text-slate-400">{activeTable}</code>
                </div>
              ) : (
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] bg-slate-900/60">
                      {Object.keys(filteredRecords[0]).map((key) => (
                        <th key={key} className="p-2.5 font-bold">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredRecords.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                        {Object.keys(row).map((k) => {
                          const val = row[k];
                          let rendered = val !== null && val !== undefined ? String(val) : 'NULL';
                          const isCertId = k === 'cert_id';
                          const isStatus = k === 'status';

                          return (
                            <td key={k} className="p-2.5 truncate max-w-[240px]">
                              {isCertId ? (
                                <span className="text-sky-400 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded">
                                  {rendered}
                                </span>
                              ) : isStatus ? (
                                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                                  {rendered}
                                </span>
                              ) : (
                                <span>{rendered}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <div className="flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-indigo-400" />
            <span>Database File Location: <code className="text-slate-200">server/schema.sql</code></span>
          </div>
          <div>
            Total active tables: <strong>4</strong> (users, orders, certificates, course_progress)
          </div>
        </div>

      </div>
    </div>
  );
}
