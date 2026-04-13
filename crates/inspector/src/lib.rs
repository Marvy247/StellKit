/// Fetches and decodes a Soroban contract's interface from the network.
/// Prints function signatures, parameter types, and storage entries.
pub fn inspect(contract: &str, network: &str) -> anyhow::Result<()> {
    // TODO: fetch WASM via Horizon/RPC, parse with stellar-xdr, print interface
    println!("[inspector] contract={contract} network={network}");
    println!("Not yet implemented — see GitHub issue #1");
    Ok(())
}
