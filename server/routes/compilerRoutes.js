import express from 'express';

const router = express.Router();

const JUDGE0_LANGUAGE_MAP = {
  cpp: 54, // C++ (GCC 9.2.0)
  'c++': 54,
  c: 50,   // C (GCC 9.2.0)
  python: 71, // Python (3.8.1)
  py: 71,
  java: 62, // Java (OpenJDK 13.0.1)
  javascript: 63, // JavaScript (Node.js 12.14.0)
  js: 63,
  csharp: 51, // C# (Mono 6.6.0.161)
  cs: 51,
  php: 68 // PHP (7.4.1)
};

// Real Online Multi-Language Code Compiler (Judge0 CE Engine)
router.post('/execute', async (req, res) => {
  try {
    const { language = 'cpp', code = '', input = '' } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ success: false, output: 'Error: Code cannot be empty.' });
    }

    const langKey = language.toLowerCase();
    const languageId = JUDGE0_LANGUAGE_MAP[langKey] || 71; // Default to Python if unknown

    const response = await fetch('https://ce.judge0.com/submissions?base64_encoded=false&wait=true', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: input || ''
      })
    });

    const data = await response.json();

    if (data) {
      const stdout = data.stdout || '';
      const stderr = data.stderr || '';
      const compileOutput = data.compile_output || '';
      const statusDescription = data.status?.description || '';

      let finalOutput = '';
      if (compileOutput) {
        finalOutput = `[Compilation Error]:\n${compileOutput}`;
      } else if (stderr) {
        finalOutput = `[Runtime Error]:\n${stderr}`;
      } else if (stdout) {
        finalOutput = stdout;
      } else {
        finalOutput = `[Program Finished with Status: ${statusDescription || 'Success (No Output)'}]`;
      }

      return res.json({
        success: !compileOutput && !stderr,
        output: finalOutput,
        executionTime: data.time ? `${data.time}s` : undefined,
        memory: data.memory ? `${data.memory} KB` : undefined,
        status: statusDescription
      });
    }

    return res.status(500).json({
      success: false,
      output: 'Failed to obtain execution response from compiler.'
    });
  } catch (error) {
    console.error('Compiler execution error:', error);
    return res.status(500).json({
      success: false,
      output: `Compiler Network Error: ${error.message}. Please check connection.`
    });
  }
});

export default router;
