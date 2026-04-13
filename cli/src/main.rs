use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(name = "sdk", about = "stellar-devkit — Soroban developer toolbox", version)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Inspect a deployed Soroban contract's interface and storage
    Inspect {
        /// Contract ID or WASM hash
        #[arg(short, long)]
        contract: String,
        /// Network: mainnet | testnet
        #[arg(short, long, default_value = "testnet")]
        network: String,
    },
    /// Profile resource usage of a Soroban transaction
    Profile {
        /// Transaction XDR or hash
        #[arg(short, long)]
        tx: String,
        #[arg(short, long, default_value = "testnet")]
        network: String,
    },
    /// Diff two versions of a Soroban contract
    Diff {
        /// First contract ID or WASM hash
        #[arg(long)]
        from: String,
        /// Second contract ID or WASM hash
        #[arg(long)]
        to: String,
        #[arg(short, long, default_value = "testnet")]
        network: String,
    },
    /// Spin up a local fork of the Stellar network at a given ledger
    Fork {
        /// Ledger sequence to snapshot (default: latest)
        #[arg(short, long)]
        ledger: Option<u32>,
        /// Port to run the local RPC on
        #[arg(short, long, default_value = "8000")]
        port: u16,
    },
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let cli = Cli::parse();
    match cli.command {
        Commands::Inspect { contract, network } => {
            inspector::inspect(&contract, &network)?;
        }
        Commands::Profile { tx, network } => {
            profiler::profile(&tx, &network)?;
        }
        Commands::Diff { from, to, network } => {
            differ::diff(&from, &to, &network)?;
        }
        Commands::Fork { ledger, port } => {
            fork::start(ledger, port).await?;
        }
    }
    Ok(())
}
