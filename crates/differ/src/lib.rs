/// Compares two Soroban contract versions (by contract ID or WASM hash).
/// Reports added/removed/changed functions and storage key types.
pub fn diff(from: &str, to: &str, network: &str) -> anyhow::Result<()> {
    // TODO: fetch both WASMs, parse interfaces, compute diff, pretty-print
    println!("[differ] from={from} to={to} network={network}");
    println!("Not yet implemented — see GitHub issue #3");
    Ok(())
}
