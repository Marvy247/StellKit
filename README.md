# stellar-devkit

A unified developer toolbox for [Soroban](https://soroban.stellar.org) smart contract development on Stellar.

Fills the most critical gaps in the Soroban developer experience that the official SDK doesn't cover.

## Tools

| Command | What it does |
|---|---|
| `sdk inspect` | Decode a deployed contract's ABI, function signatures, and storage layout |
| `sdk profile` | Simulate a transaction and get a CPU/memory/ledger resource breakdown |
| `sdk diff` | Compare two contract versions — see what functions and storage changed |
| `sdk fork` | Spin up a local Stellar network snapshot at any ledger for safe testing |

## Install

```bash
cargo install --path cli
```

## Usage

```bash
# Inspect a deployed contract
sdk inspect --contract CXXX... --network mainnet

# Profile resource usage of a transaction
sdk profile --tx <tx-xdr-or-hash> --network testnet

# Diff two contract versions
sdk diff --from <wasm-hash-v1> --to <wasm-hash-v2>

# Fork testnet at latest ledger, expose RPC on :8000
sdk fork --port 8000
```

## Architecture

```
stellar-devkit/
├── cli/                  # CLI entry point (clap)
└── crates/
    ├── inspector/        # WASM parsing + interface decoding
    ├── profiler/         # simulateTransaction resource analysis
    ├── differ/           # Contract version diffing
    └── fork/             # Local network snapshot + RPC
```

## Contributing

This project participates in the [Stellar Wave](https://drips.network/wave/stellar) on Drips.
Check the [open issues](../../issues) for bounty-eligible tasks.

## License

MIT
