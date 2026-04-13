import { ReactNode } from 'react';

interface Props {
  icon: string;
  name: string;
  command: string;
  description: string;
  children: ReactNode;
}

export default function ToolShell({ icon, name, command, description, children }: Props) {
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{icon}</span>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif font-bold text-4xl text-text-main">{name}</h1>
              <span className="font-mono text-sm px-3 py-1 rounded-lg bg-accent-indigo/10 text-accent-indigo border border-accent-indigo/20">
                {command}
              </span>
            </div>
            <p className="text-text-dim mt-1 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl p-8 border border-app-border">
        {children}
      </div>
    </div>
  );
}
