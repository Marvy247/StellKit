import { useState } from 'react';
import toast from 'react-hot-toast';
import ToolShell from './ToolShell';
import { NetworkSelect, OutputPreview } from './Inspector';

export default function Profiler() {
  const [tx, setTx] = useState('');
  const [network, setNetwork] = useState('testnet');

  const handleRun = () => {
    if (!tx.trim()) return toast.error('Enter a transaction XDR or hash');
    toast.success('Coming soon — see GitHub issue #2');
  };

  return (
    <ToolShell
      icon="📊"
      name="Profiler"
      command="sdk profile"
      description="Simulate a Soroban transaction and get a full breakdown of CPU instructions, memory, and ledger read/write costs before you deploy."
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-dim mb-2">Transaction XDR or Hash</label>
          <textarea
            className="input-premium resize-none h-24"
            placeholder="AAAAAgAAAA... or transaction hash"
            value={tx}
            onChange={(e) => setTx(e.target.value)}
          />
        </div>
        <NetworkSelect value={network} onChange={setNetwork} />
        <button onClick={handleRun} className="btn-primary w-full">
          Profile Transaction →
        </button>
      </div>

      <OutputPreview
        label="Expected output"
        content={`Resource Usage Breakdown
─────────────────────────────────────────────────
  cpu_insns        2,847,291   /  100,000,000   (2.8%)
  mem_bytes          184,320   /   41,943,040   (0.4%)
  ledger_read_bytes   12,288   /   197,632      (6.2%)
  ledger_write_bytes   1,024   /    65,536      (1.6%)
  read_entries             4   /       40       (10%)
  write_entries            1   /       25       (4%)`}
      />
    </ToolShell>
  );
}
