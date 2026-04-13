# Wave 3 GitHub Issues — stellar-devkit
# Post each of these as a separate GitHub issue on your repo.
# Label each with "Stellar Wave" after your repo is approved.

---

## Issue #1 — [inspector] Fetch and decode Soroban contract interface from network
**Complexity: High (200 pts)**

Implement `inspector::inspect(contract_id, network)` to:
- Fetch the contract's WASM bytecode via the Soroban RPC `getLedgerEntries` endpoint
- Parse the WASM using `stellar-xdr` to extract the contract spec (function names, param types, return types)
- Print a human-readable table of all exported functions and their signatures
- Print all declared storage key types (Persistent, Temporary, Instance)

**Acceptance criteria:**
- Works for any deployed contract on testnet and mainnet
- Output includes function name, parameters with types, return type
- Storage section lists key type and durability
- Handles errors gracefully (invalid contract ID, network timeout)

**Resources:**
- [Soroban RPC getLedgerEntries](https://developers.stellar.org/docs/data/rpc/api-reference/methods/getLedgerEntries)
- [stellar-xdr crate](https://crates.io/crates/stellar-xdr)
- [Contract spec XDR types](https://github.com/stellar/stellar-xdr/blob/curr/Stellar-contract-spec.x)

---

## Issue #2 — [profiler] Simulate transaction and report resource usage breakdown
**Complexity: High (200 pts)**

Implement `profiler::profile(tx, network)` to:
- Call `simulateTransaction` RPC with the provided transaction XDR
- Parse the `cost` field from the response (CPU instructions, memory bytes)
- Parse `footprint` to show ledger reads and writes
- Display results as a formatted table: resource type | used | limit | % of limit

**Acceptance criteria:**
- Accepts raw transaction XDR or a transaction hash (fetch XDR from network)
- Table shows: cpu_insns, mem_bytes, ledger_read_bytes, ledger_write_bytes, read_entries, write_entries
- Shows each value alongside the network limit so devs know how close they are
- JSON output flag `--json` for programmatic use

**Resources:**
- [simulateTransaction RPC](https://developers.stellar.org/docs/data/rpc/api-reference/methods/simulateTransaction)
- [Soroban resource limits](https://developers.stellar.org/docs/networks/resource-limits-fees)

---

## Issue #3 — [differ] Diff two Soroban contract versions by WASM hash
**Complexity: Medium (150 pts)**

Implement `differ::diff(from_hash, to_hash, network)` to:
- Fetch both WASMs from the network by WASM hash using `getLedgerEntries`
- Parse both contract specs using `stellar-xdr`
- Compute the diff: added functions, removed functions, changed signatures
- Compute storage diff: added/removed/changed storage key types
- Print a colored diff output (green = added, red = removed, yellow = changed)

**Acceptance criteria:**
- Correctly identifies added, removed, and modified function signatures
- Correctly identifies storage schema changes
- Works with both contract IDs and raw WASM hashes as input
- `--json` flag outputs machine-readable diff

---

## Issue #4 — [fork] Spin up a local Stellar network snapshot for testing
**Complexity: High (200 pts)**

Implement `fork::start(ledger, port)` to:
- Connect to testnet or mainnet RPC
- Snapshot ledger state at the given sequence (or latest if not specified)
- Start a local `stellar-rpc` process configured against the snapshot
- Print the local RPC URL once ready (`http://localhost:{port}`)

**Acceptance criteria:**
- Local RPC responds to standard Soroban RPC methods
- Contracts deployed on the real network are accessible locally
- State changes made locally do not affect the real network
- `--ledger` flag accepts a specific sequence number

**Resources:**
- [stellar-rpc GitHub](https://github.com/stellar/stellar-rpc)
- [stellar-core standalone mode](https://developers.stellar.org/docs/validators/admin-guide/running-node)

---

## Issue #5 — [cli] Add `--output json` flag to all commands
**Complexity: Trivial (100 pts)**

All four commands (`inspect`, `profile`, `diff`, `fork`) should support a global `--output json` flag.
When set, output is printed as structured JSON instead of human-readable tables.
This enables piping into other tools (e.g. `sdk inspect ... --output json | jq .functions`).

---

## Issue #6 — [docs] Write getting-started guide with real contract examples
**Complexity: Medium (150 pts)**

Write `docs/getting-started.md` covering:
- Installation from source
- Running `inspect` on a known testnet contract (provide a real example contract ID)
- Running `profile` on a sample transaction
- Running `diff` between two versions of the same contract
- Include expected output for each command so users know what to expect

---

## Issue #7 — [inspector] Add support for reading current Instance storage values
**Complexity: Medium (150 pts)**

Extend `inspector::inspect` with a `--storage` flag that, in addition to showing storage key types,
also fetches and displays the current live values stored in the contract's Instance storage.

**Acceptance criteria:**
- `sdk inspect --contract CXXX --storage` shows key → value pairs from Instance storage
- Values are decoded from XDR to human-readable form where possible
- Large values are truncated with a `--full` flag to show everything
