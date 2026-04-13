import { useState } from 'react';
import toast from 'react-hot-toast';
import ToolShell from './ToolShell';
import { OutputPreview } from './Inspector';

export default function Fork() {
  const [ledger, setLedger] = useState('');
  const [port, setPort] = useState('8000');
  const [network, setNetwork] = useState('testnet');

  const handleRun = () => {
    toast.success('Coming soon — see GitHub issue #4');
  };

  return (
    <ToolShell
      icon="🍴"
      name="Fork"
      command="sdk fork"
      description="Snapshot a live Stellar network at any ledger sequence and spin up a local RPC endpoint. Test against real contract state without touching mainnet."
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-dim mb-2">Network to fork</label>
          <div className="flex gap-2">
            {['testnet', 'mainnet'].map((n) => (
              <button
                key={n}
                onClick={() => setNetwork(n)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  network === n
                    ? 'bg-accent-indigo text-white border-accent-indigo'
                    : 'border-app-border text-text-dim hover:border-accent-indigo/40 hover:text-accent-indigo'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-dim mb-2">Ledger sequence <span className="text-text-pale">(optional)</span></label>
            <input
              className="input-premium"
              placeholder="latest"
              value={ledger}
              onChange={(e) => setLedger(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dim mb-2">Local RPC port</label>
            <input
              className="input-premium"
              placeholder="8000"
              value={port}
              onChange={(e) => setPort(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handleRun} className="btn-primary w-full">
          Start Local Fork →
        </button>
      </div>

      <OutputPreview
        label="Expected output"
        content={`Snapshotting testnet at ledger #54,291,847...
Fetching ledger state... done
Starting stellar-rpc in standalone mode...

  ✓ Local RPC ready at http://localhost:8000
  ✓ Horizon API at  http://localhost:8000/horizon

Use this RPC URL in your contracts or CLI:
  stellar contract invoke --rpc-url http://localhost:8000 ...`}
      />
    </ToolShell>
  );
}
