/// Starts a local Stellar network fork at the given ledger sequence.
/// Exposes a local RPC endpoint for testing against real mainnet/testnet state.
pub async fn start(ledger: Option<u32>, port: u16) -> anyhow::Result<()> {
    // TODO: snapshot ledger state via Horizon, spin up stellar-core in standalone mode
    println!("[fork] ledger={ledger:?} port={port}");
    println!("Not yet implemented — see GitHub issue #4");
    Ok(())
}
