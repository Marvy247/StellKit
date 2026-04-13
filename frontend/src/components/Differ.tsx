import { useState } from 'react';
import toast from 'react-hot-toast';
import ToolShell from './ToolShell';
import { NetworkSelect, OutputPreview } from './Inspector';

export default function Differ() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [network, setNetwork] = useState('testnet');

  const handleRun = () => {
    if (!from.trim() || !to.trim()) return toast.error('Enter both contract IDs or WASM hashes');
    toast.success('Coming soon — see GitHub issue #3');
  };

  return (
    <ToolShell
      icon="🔀"
      name="Differ"
      command="sdk diff"
      description="Compare two versions of a deployed Soroban contract. See exactly which functions were added, removed, or changed — and how storage schemas evolved."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-dim mb-2">From (v1)</label>
            <input
              className="input-premium"
              placeholder="WASM hash or contract ID"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dim mb-2">To (v2)</label>
            <input
              className="input-premium"
              placeholder="WASM hash or contract ID"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>
        <NetworkSelect value={network} onChange={setNetwork} />
        <button onClick={handleRun} className="btn-primary w-full">
          Compare Versions →
        </button>
      </div>

      <OutputPreview
        label="Expected output"
        content={`Contract Diff  v1 → v2
─────────────────────────────────────────────────
  Functions
  + mint(to: Address, amount: i128) → ()          [added]
  ~ transfer(from, to, amount) → ()               [sig unchanged]
  - burn_from(spender, from, amount) → ()         [removed]

  Storage
  + Allowance  [Temporary]  key: (Address, Address)  [added]
  ~ Balance    [Persistent] key: Address              [unchanged]`}
      />
    </ToolShell>
  );
}
