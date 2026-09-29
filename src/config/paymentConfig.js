// ========================================================
// CodeVidya Payment Gateway & Bank Account Configuration
// Live Real Payment Details Configured
// ========================================================

export const PAYMENT_CONFIG = {
  // 1. UPI Payment Configuration
  upi: {
    upiId: "akk9512@axl",
    payeeName: "CodeVidya CS Academy",
    customQrImageUrl: null // Will generate real dynamic UPI QR using upiId
  },

  // 2. Direct Bank Transfer (NEFT / IMPS / RTGS) Details
  bankDetails: {
    accountHolderName: "Anil Kumar",
    accountNumber: "42716680774",
    ifscCode: "SBIN0011313",
    bankName: "State Bank of India",
    accountType: "Savings / Current Account",
    branch: "SBI Branch"
  }
};
