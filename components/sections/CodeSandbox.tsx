"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Copy, Check, Terminal } from "lucide-react";

interface CodeSnippet {
  id: string;
  label: string;
  language: string;
  filename: string;
  code: string;
}

const snippets: CodeSnippet[] = [
  {
    id: "ts-saas",
    label: "TypeScript / Next.js",
    language: "typescript",
    filename: "sutura-measurement-vault.ts",
    code: `// Encrypted Customer Body Measurement Vault Architecture
export async function storeEncryptedMeasurements(
  customerId: string,
  params: BodyMeasurementParams
): Promise<VaultResult> {
  const payload = encryptPayload(params, process.env.VAULT_SECRET!);
  const { data, error } = await supabase
    .from('customer_measurements')
    .upsert({ customer_id: customerId, payload, updated_at: new Date() });

  if (error) throw new VaultError("Encryption store failed");
  return { success: true, timestamp: Date.now() };
}`,
  },
  {
    id: "csharp-ledger",
    label: "C# Double-Entry Ledger",
    language: "csharp",
    filename: "SecureLendLedger.cs",
    code: `// Double-Entry Accounting Atomic Transaction Engine
public class LoanLedgerEngine {
    public async Task<bool> RecordRepaymentAsync(decimal amount, string borrowerId) {
        using var tx = await _dbContext.Database.BeginTransactionAsync();
        try {
            // Debit Cash/Bank Asset, Credit Loans Receivable Asset
            await PostJournalEntryAsync(AccountType.Bank, amount, EntrySide.Debit);
            await PostJournalEntryAsync(AccountType.LoansReceivable, amount, EntrySide.Credit);
            
            await tx.CommitAsync();
            return true;
        } catch {
            await tx.RollbackAsync();
            throw;
        }
    }
}`,
  },
  {
    id: "java-mvc",
    label: "Java OOP / Swing",
    language: "java",
    filename: "LibraTrackController.java",
    code: `// Modular MVC Controller for Overdue Fines
public class FineCalculationController {
    private static final double DAILY_FINE_RATE = 15.00; // PHP

    public double computeFine(LocalDate dueDate, LocalDate returnDate) {
        long daysOverdue = ChronoUnit.DAYS.between(dueDate, returnDate);
        if (daysOverdue <= 0) return 0.0;
        return Math.min(daysOverdue * DAILY_FINE_RATE, 500.00);
    }
}`,
  },
];

export function CodeSandbox() {
  const [activeTab, setActiveTab] = useState<string>(snippets[0].id);
  const [copied, setCopied] = useState(false);
  const activeSnippet = snippets.find((s) => s.id === activeTab)!;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code-sandbox" className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 border-y border-line">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-glow mb-3">
            <Terminal className="h-3.5 w-3.5" />
            <span>Code Proof &amp; Architecture</span>
          </div>

          <h2 className="display text-4xl text-cream sm:text-6xl lg:text-7xl">
            Code Quality &amp; Patterns
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-cream-dim leading-relaxed">
          Inspect clean code samples from real production systems built in TypeScript, C#, and Java OOP architecture.
        </p>
      </div>

      {/* Clean Monospaced Tab Bar */}
      <div className="flex flex-wrap gap-2 border-b border-line pb-4 mb-8">
        {snippets.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
              activeTab === s.id
                ? "border-b-2 border-emerald-glow text-emerald-glow font-bold"
                : "text-cream-dim hover:text-cream"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Editorial IDE Code Frame */}
      <div className="relative border-y border-line bg-ink-soft/40 p-6 sm:p-8 overflow-hidden space-y-4">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-cream">
            <Code className="h-4 w-4 text-emerald-glow" />
            <span>{activeSnippet.filename}</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 font-mono text-xs text-cream-dim hover:text-emerald-glow transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-glow" />
                <span className="text-emerald-glow font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        <pre className="overflow-x-auto font-mono text-xs text-cream/90 leading-relaxed py-2">
          <code>{activeSnippet.code}</code>
        </pre>
      </div>
    </section>
  );
}
