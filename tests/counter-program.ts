import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { CounterProgram } from "../target/types/counter_program";
import { Keypair, SystemProgram } from "@solana/web3.js";

describe("counter-program", () => {
  anchor.setProvider(anchor.AnchorProvider.env())
  const provider = anchor.AnchorProvider.env()
  const program = anchor.workspace.CounterProgram as Program<CounterProgram>

	// create counter keypair
  let counter = Keypair.generate()

  it("Create Counter account!", async () => {
    
    const tx = await program.methods.create()
    .accounts({
      counter: counter.publicKey,
      authority: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    })
    .signers([counter])
    .rpc();
    
    let counter_current_value = await program.account.counter.fetch(counter.publicKey);
    console.log("COUNTER VALUE IS AFTER CREATING THE ACCOUNT IS: ", counter_current_value.count.toNumber());
    //console.log("Your transaction signature", tx);
  });

  it("Increment Counter account!", async () => {
    
    const tx = await program.methods.increment()
    .accounts({
      counter: counter.publicKey,
      authority: provider.wallet.publicKey,
    })
    //.signers([counter])
    .rpc();
    
    let counter_current_value = await program.account.counter.fetch(counter.publicKey);
    console.log("COUNTER VALUE IS AFTER INCREMENTING THE ACCOUNT IS: ", counter_current_value.count.toNumber());
    //console.log("Your transaction signature", tx);
  });

  it("Decrement Counter account!", async () => {
    
    const tx = await program.methods.decrement()
    .accounts({
      counter: counter.publicKey,
      authority: provider.wallet.publicKey,
    })
    //.signers([counter])
    .rpc();
    
    let counter_current_value = await program.account.counter.fetch(counter.publicKey);
    console.log("COUNTER VALUE IS AFTER DECREMENTING THE ACCOUNT IS: ", counter_current_value.count.toNumber());
    //console.log("Your transaction signature", tx);
  });


});
