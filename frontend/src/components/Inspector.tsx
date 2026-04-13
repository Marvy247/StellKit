import { useState } from 'react';
import toast from 'react-hot-toast';
import ToolShell from './ToolShell';

export default function Inspector() {
  const [contract, setContract] = useState('');
  const [network, setNetwork] = useState('testnet');

  const handleRun = () => {
    if (!contract.trim()) return toast.error('Enter a contract ID');
    toast.success('Coming soon — see GitHub issue #1');
  };

  return (
    <ToolShell
      icon="🔍"
      name="Inspector"
      command="sdk inspect"
      description="Decode a deployed Soroban contract's ABI, function signatures, and storage layout directly from its on-chain WASM."
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-dim mb-2">Contract ID</label>
          <input
            className="input-premium"
            placeholder="CXXX..."
            value={contract}
            onChange={(e) => setContract(e.target.value)}
          />
        </div>
        <NetworkSelect value={network} onChange={setNetwork} />
        <button onClick={handleRun} className="btn-primary w-full">
          Inspect Contract →
        </button>
      </div>

      <OutputPreview
        label="Expected output"
        content={`Functions
─────────────────────────────────────
  transfer(from: Address, to: Address, amount: i128) → ()
  balance(id: Address) → i128
  allowance(from: Address, spender: Address) → i128

Storage
─────────────────────────────────────
  Balance     [Persistent]  key: Address
  Allowance   [Temporary]   key: (Address, Address)
  Metadata    [Instance]    key: Symbol`}
      />
    </ToolShell>
  );
}

function NetworkSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-dim mb-2">Network</label>
      <div className="flex gap-2">
        {['testnet', 'mainnet'].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
              value === n
                ? 'bg-accent-indigo text-white border-accent-indigo'
                : 'border-app-border text-text-dim hover:border-accent-indigo/40 hover:text-accent-indigo'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function OutputPreview({ label, content }: { label: string; content: string }) {
  return (
    <div className="mt-8">
      <p className="text-xs font-medium text-text-pale uppercase tracking-widest mb-3">{label}</p>
      <div className="glass rounded-2xl p-6 border border-app-border font-mono text-sm text-text-dim whitespace-pre leading-relaxed overflow-x-auto">
        {content}
      </div>
    </div>
  );
}

export { NetworkSelect, OutputPreview };
