import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Menu,
  ChevronRight,
  BookOpen,
  Cpu,
  Clock,
  Code,
  LayoutDashboard,
  X,
} from "lucide-react";
import archi from "./assets/archi.jpg";
import pind from "./assets/pindiag.png";
import bus from "./assets/bus.png";
import demux from "./assets/demux.png";
import progm from "./assets/progm.png";
import flag from "./assets/flag.jpg";
import arch from "./assets/8086arch.png";
import segment from "./assets/segment.png";
import opcode from "./assets/opcodefetch.jpg";
import memr from "./assets/memread.webp";
import memw from "./assets/memwrite.webp";
import iow from "./assets/iowrite.webp";
import ior from "./assets/ioread.jpg";
import movbm from "./assets/movam.png";
import mvia from "./assets/mvia.png";
import outh from "./assets/outh.png";
import inh from "./assets/inh.png";
import comp from "./assets/comp.png";
import sim from "./assets/sim.png";
import rim from "./assets/rim.png";

// Injecting Bricolage Grotesque Font
const FontStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap');
      body {
        font-family: 'Bricolage Grotesque', sans-serif !important;
      }
      .img-placeholder {
        display: block;
        width: 100%;
        max-width: 800px;
        margin: 1.5rem auto;
        border-radius: 0.5rem;
        border: 1px dashed #cbd5e1;
        background-color: #f8fafc;
        min-height: 200px;
        position: relative;
      }
      .dark .img-placeholder {
        border-color: #334155;
        background-color: #0f172a;
      }
      .img-placeholder::after {
        content: attr(alt);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #64748b;
        font-size: 0.875rem;
        text-align: center;
        padding: 1rem;
      }
    `}
  </style>
);

// Reusable Collapsible (Accordion) Component
const Collapsible = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="mb-4 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
      <button
        className="w-full flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 transition-colors text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 m-0">
          {title}
        </h3>
        <ChevronRight
          className={`w-5 h-5 text-slate-500 transform transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          {children}
        </div>
      )}
    </div>
  );
};

const programsUnit5 = [
  {
    id: 1,
    title: "Load registers with immediate data",
    code: "MVI B, 14H\nMVI C, FFH\nMVI D, 29H\nMVI E, 67H\nHLT",
  },
  {
    id: 2,
    title: "Transfer data from register B to C",
    code: "MVI B, 55H\nMOV C, B\nHLT",
  },
  {
    id: 3,
    title: "Store data of register B into memory 2050H",
    code: "MVI B, 67H\nMOV A, B\nSTA 2050H\nHLT",
  },
  {
    id: 4,
    title: "Store data 56H directly into memory 2050H",
    code: "LXI H, 2050H\nMVI M, 56H\nHLT",
  },
  {
    id: 5,
    title: "Exchange two 8-bit numbers (2050H and 2051H)",
    code: "LDA 2050H\nMOV B, A\nLDA 2051H\nSTA 2050H\nMOV A, B\nSTA 2051H\nHLT",
  },
  {
    id: 6,
    title: "Interchange 16-bit data (BC and DE)",
    code: "; WITHOUT XCHG\nMOV H, B\nMOV L, C\nMOV B, D\nMOV C, E\nMOV D, H\nMOV E, L\nHLT\n\n; WITH XCHG\nMOV H, B\nMOV L, C\nXCHG\nMOV B, H\nMOV C, L\nHLT",
  },
  {
    id: 7,
    title: "Store contents of B and C on the stack",
    code: "MVI B, 50H\nMVI C, 60H\nPUSH B\nPUSH C\nHLT",
  },
  {
    id: 8,
    title: "Delete (Make 00H) data byte at memory from DE",
    code: "MVI A, 00H\nSTAX D\nHLT",
  },
  {
    id: 9,
    title: "Add two 8-bit numbers (Store in 2052H)",
    code: "LXI H, 2050H\nMOV A, M\nINX H\nADD M\nINX H\nMOV M, A\nHLT",
  },
  {
    id: 10,
    title: "Subtract 8-bit data (2051H - 2050H)",
    code: "LXI H, 2050H\nMOV A, M\nINX H\nSUB M\nINX H\nMOV M, A\nHLT",
  },
  {
    id: 11,
    title: "Add two 16-bit numbers stored in memory",
    code: "LHLD 2050H\nXCHG\nLHLD 2052H\nMOV A, E\nADD L\nMOV L, A\nMOV A, D\nADC H\nMOV H, A\nSHLD 2054H\nHLT",
  },
  {
    id: 12,
    title: "Find the number of 1's in 8-bit number",
    code: "MVI B, 00H\nMVI C, 08H\nMOV A, D\nBACK: RAR\nJNC SKIP\nINR B\nSKIP: DCR C\nJNZ BACK\nHLT",
  },
  {
    id: 13,
    title: "Implement Boolean equation D = (B+C) . E",
    code: "MOV A, B\nORA C\nANA E\nMOV D, A\nHLT",
  },
  {
    id: 14,
    title: "Add two decimal numbers using DAA",
    code: "LXI H, 2050H\nMOV A, M\nINX H\nMOV B, M\nMVI C, 00H\nADD B\nDAA\nJNC SKIP\nINR C\nSKIP: INX H\nMOV M, A\nINX H\nMOV M, C\nHLT",
  },
  {
    id: 15,
    title: "Find the minimum from two 8-bit numbers",
    code: "LDA 2050H\nMOV B, A\nLDA 2051H\nCMP B\nJNC SMALL\nSTA 2052H\nHLT\nSMALL: MOV A, B\nSTA 2052H\nHLT",
  },
  {
    id: 16,
    title: "Copy block of five numbers",
    code: "LXI D, 3100H\nMVI C, 05H\nLXI H, 2100H\nLOOP: MOV A, M\nSTAX D\nINX D\nINX H\nDCR C\nJNZ LOOP\nHLT",
  },
  {
    id: 17,
    title: "Find the largest number in array of 10",
    code: "LXI H, 2100H\nMVI C, 0AH\nMOV A, M\nDCR C\nLOOP: INX H\nCMP M\nJNC AHED\nMOV A, M\nAHED: DCR C\nJNZ LOOP\nSTA 2200H\nHLT",
  },
  {
    id: 18,
    title: "Add block of 8-bit numbers",
    code: "LXI H, 2000H\nLXI B, 3000H\nLXI D, 4000H\nBACK: LDAX B\nADD M\nSTAX D\nINX H\nINX B\nINX D\nMOV A, L\nCPI 0AH\nJNZ BACK\nHLT",
  },
  {
    id: 19,
    title: "Count length of string ending with 0DH",
    code: "LXI H, 2050H\nMVI B, 00H\nBACK: MOV A, M\nINR B\nINX H\nCPI 0DH\nJNZ BACK\nDCR B\nHLT",
  },
  {
    id: 20,
    title: "Separate EVEN and ODD numbers in arrays",
    code: "LXI H, 2000H\nLXI D, 2100H\nLXI B, 2200H\nMVI A, 0AH\nCOUNTER: STA 3000H\nMOV A, M\nANI 01H\nJNZ CARRY\nMOV A, M\nSTAX B\nINX B\nJMP JUMP\nCARRY: MOV A, M\nSTAX D\nINX D\nJUMP: LDA 3000H\nDCR A\nINX H\nJNZ COUNTER\nHLT",
  },
  {
    id: 21,
    title: "Find bytes with complemented nibbles (e.g. 2DH)",
    code: "LXI H, 2100H\nLXI D, 2200H\nMVI C, 0AH\nLOOP: MOV A, M\nANI 0FH\nMOV B, A\nMOV A, M\nANI F0H\nRRC\nRRC\nRRC\nRRC\nCMP B\nJNZ NEXT\nMOV A, M\nSTAX D\nINX D\nNEXT: INX H\nDCR C\nJNZ LOOP\nHLT",
  },
  {
    id: 22,
    title: "Count +ve, -ve, zeros, and find max in array",
    code: "LXI H, 2000H\nMVI C, 14H\nMVI D, 00H\nMVI B, 00H\nMVI E, 00H\nLOOP: MOV A, M\nCMP B\nJC NEG\nJNZ POS\nINX H\nDCR C\nJNZ LOOP\nJMP STORE\nNEG: INR D\nINX H\nDCR C\nJNZ LOOP\nJMP STORE\nPOS: INR E\nINX H\nDCR C\nJNZ LOOP\nJMP STORE\nSTORE: MOV A, E\nSTA 3001H\nMOV A, D\nSTA 3002H\n; ... (Refer to full logic for Zero/Max iteration)",
  },
  {
    id: 23,
    title: "Separate numbers between 20 and 40",
    code: "LXI H, 2000H\nLXI D, 3000H\nMVI C, 0AH\nLOOP: MOV A, M\nCPI 14H\nJZ NEXT\nJC NEXT\nCPI 28H\nJNC NEXT\nSTAX D\nINX D\nNEXT: INX H\nDCR C\nJNZ LOOP\nHLT",
  },
  {
    id: 24,
    title: "Sort array of twenty bytes in descending order",
    code: "MVI B, 14H\nL2: LXI H, 2000H\nMVI C, 13H\nL1: MOV A, M\nINX H\nCMP M\nJC SWAP\nBACK: DCR C\nJNZ L1\nDCR B\nJNZ L2\nHLT\nSWAP: MOV D, M\nMOV M, A\nDCX H\nMOV M, D\nINX H\nJMP BACK",
  },
  {
    id: 25,
    title: "Remove duplicate entries from array",
    code: "MVI B, 14H\nMVI C, 01H\nLXI H, 4101H\nSHLD 3000H\nLDA 4100H\nSTA 4200H\nL1: LHLD 3000H\nMOV A, M\nINX H\nDCR B\nJZ OVER\nSHLD 3000H\nLXI H, 4200H\nMOV D, C\nL2: CMP M\nJZ L1\nINX H\nDCR D\nJNZ L2\nMOV M, A\nINR C\nJMP L1\nOVER: HLT",
  },
  {
    id: 26,
    title: "Pack two unpacked BCD numbers",
    code: "LDA 2201H\nRLC\nRLC\nRLC\nRLC\nANI F0H\nMOV C, A\nLDA 2200H\nADD C\nSTA 2300H\nHLT",
  },
  {
    id: 27,
    title: "Unpack upper nibble of a BCD number",
    code: "MVI A, 98H\nMOV B, A\nANI F0H\nRRC\nRRC\nRRC\nRRC\nSTA 2000H\nHLT",
  },
  {
    id: 28,
    title: "Subtract two 16-bit BCD numbers",
    code: "LXI H, 3040H\nLXI D, 1020H\nMOV A, L\nSUB E\nDAA\nSTA 2000H\nMOV A, H\nSBB D\nDAA\nSTA 2001H\nHLT",
  },
  {
    id: 29,
    title: "Read input & output on RST 5.5 Interrupt",
    code: "LOOP: IN 50H\nEI\nCALL DELAY\nJMP LOOP\nHLT\nDELAY: NOP\nNOP\nNOP\nNOP\nRET\n\n; ISR at 002CH:\nOUT A0H\nJMP LOOP",
  },
  {
    id: 30,
    title: "Generate 2.5 kHz square wave",
    code: "MVI A, 01H\nREPEAT: OUT ACH\nMVI C, 2FH\nAGAIN: DCR C\nJNZ AGAIN\nCMA\nJMP REPEAT",
  },
  {
    id: 31,
    title: "Factorial of an 8-bit Number",
    code: "; Find factorial of number at 3000H. Store at 4000H.\n; Idea: Multiply numbers n × (n-1) × (n-2)\nLXI H,3000H     ; HL points to number\nMOV B,M         ; Move number to B\nMVI A,01H       ; Initialize result\n\nLOOP: MOV C,B\n      CALL MULT\n      DCR B\n      JNZ LOOP\n\nSTA 4000H\nHLT\n\nMULT: MVI D,00H\n      MOV E,A\nM1:   ADD E\n      DCR C\n      JNZ M1\n      RET",
  },
  {
    id: 32,
    title: "Sorting Five Numbers (Bubble Sort)",
    code: "; Sort numbers from 3000H and store result at 4000H.\nLXI H,3000H\nMVI C,04H\n\nOUTER: MVI B,04H\n       LXI H,3000H\n\nINNER: MOV A,M\n       INX H\n       CMP M\n       JC NEXT\n       MOV D,M\n       MOV M,A\n       DCX H\n       MOV M,D\n       INX H\n\nNEXT:  DCR B\n       JNZ INNER\n\n       DCR C\n       JNZ OUTER\n\nHLT",
  },
  {
    id: 33,
    title: "Reverse Block Using Stack",
    code: "; Reverse data stored in memory using stack.\n; Idea: Push values to stack, Pop them back in reverse order\nLXI H,3000H\nMVI B,05H\n\nPUSH_LOOP:\nMOV A,M\nPUSH PSW\nINX H\nDCR B\nJNZ PUSH_LOOP\n\nLXI H,4000H\nMVI B,05H\n\nPOP_LOOP:\nPOP PSW\nMOV M,A\nINX H\nDCR B\nJNZ POP_LOOP\n\nHLT",
  },
  {
    id: 34,
    title: "Square Root of Number",
    code: "; Find square root and display at port 01H.\n; Concept: Use odd number subtraction method\nMVI B,00H\nMVI C,01H\n\nLOOP:\nMOV A,B\nADD C\nCMP D\nJC NEXT\n\nOUT 01H\nHLT\n\nNEXT:\nINR B\nINR C\nJMP LOOP",
  },
];

// --- DATA & CONTENT ---
const contentData = [
  {
    id: "architecture",
    title: "1. Architecture & Hardware (8085)",
    icon: <Cpu className="w-5 h-5" />,
    content: (
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
            Main Features of 8085
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
            <li>It is an 8-bit microprocessor.</li>
            <li>Manufactured with N-MOS technology.</li>
            <li>
              16-bit address bus; can address up to 2^16 = 65,536 bytes (64KB)
              memory locations (A0-A15).
            </li>
            <li>
              First 8 lines of address bus and 8 lines of data bus are
              multiplexed (AD0 - AD7).
            </li>
            <li>Data bus is a group of 8 lines (D0 - D7).</li>
            <li>Supports external interrupt requests.</li>
            <li>
              Contains a 16-bit Program Counter (PC) and 16-bit Stack Pointer
              (SP).
            </li>
            <li>
              Six 8-bit general-purpose registers arranged in pairs: BC, DE, HL.
            </li>
            <li>
              Requires a single +5V power supply and operates at 3.2 MHz
              single-phase clock.
            </li>
            <li>Enclosed in a 40-pin DIP (Dual in line package).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
            8085 Microprocessor Architecture
          </h2>
          <img
            src={archi}
            alt="8085 Microprocessor Architecture Block Diagram"
            className="img-placeholder"
          />
          <p className="mt-4 text-slate-700 dark:text-slate-300">
            The architecture is divided into seven main parts: Register Unit,
            Program Counter, Stack Pointer, MUX/DEMUX unit, Address/Data
            Buffers, Control Unit (IR, Decoder, Timing), ALU (Accumulator,
            Flags), Interrupt Control, and Serial I/O Control.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
            Programming Model
          </h2>
          <img
            src={progm}
            alt="8085 Programming Model Diagram"
            className="img-placeholder"
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
            Flags Register
          </h2>
          <img
            src={flag}
            alt="8085 Flags Register Diagram"
            className="img-placeholder"
          />
          <p className="mb-4 text-slate-700 dark:text-slate-300">
            Includes five flip-flops set/reset after an operation according to
            data conditions in the accumulator.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Z (Zero):</strong> 1 if ALU result is exactly zero.
            </li>
            <li>
              <strong>CY (Carry):</strong> 1 if addition causes carry out or
              subtraction requires borrow.
            </li>
            <li>
              <strong>AC (Auxiliary Carry):</strong> 1 if carry propagates from
              D3 to D4.
            </li>
            <li>
              <strong>S (Sign):</strong> 1 if result is negative (replica of D7
              bit).
            </li>
            <li>
              <strong>P (Parity):</strong> 1 if result has an even number of 1s.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
            8085 Pin Diagram
          </h2>
          <img
            src={pind}
            alt="8085 Pin Diagram (40 pins)"
            className="img-placeholder"
          />
          <p className="mt-4 mb-2 font-bold text-slate-800 dark:text-slate-200">
            Signals are classified into 6 groups:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Address Bus (A8-A15):</strong> Unidirectional.
            </li>
            <li>
              <strong>Data/Address Bus (AD0-AD7):</strong> Bidirectional &
              multiplexed.
            </li>
            <li>
              <strong>Control & Status:</strong> RD', WR', S1, S0, IO/M', ALE,
              READY.
            </li>
            <li>
              <strong>Power Supply & Frequency:</strong> Vcc (+5V), Vss (GND),
              X1, X2, CLK (OUT).
            </li>
            <li>
              <strong>Interrupts & Externally Initiated:</strong> INTR, INTA',
              RST 7.5/6.5/5.5, TRAP, HOLD, HLDA, RESET IN'/OUT.
            </li>
            <li>
              <strong>Serial I/O:</strong> SID, SOD.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl fo  nt-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
            Bus Organization
          </h2>
          <img
            src={bus}
            alt="Bus Organization Diagram of 8085"
            className="img-placeholder"
          />
          <p className="mt-4 text-slate-700 dark:text-slate-300">
            The AD0-AD7 bus carries the low-order address during T1 and data
            during T2/T3. The <strong>ALE (Address Latch Enable)</strong> signal
            goes high during T1 to latch the address into an external 74LS373
            IC, separating the address from the data.
          </p>

          <div className="mb-8">
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              The microprocessor needs a way to talk to its memory and connected
              I/O devices. It does this using bundles of communication wires
              called <strong>"buses."</strong> In the 8085, the bus system is
              primarily divided into three distinct groups.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 text-slate-700 dark:text-slate-300">
              {/* Address Bus */}
              <div className="bg-sky-50 dark:bg-sky-900/20 p-5 rounded-lg border border-sky-100 dark:border-sky-800 shadow-sm flex flex-col">
                <h3 className="font-bold text-lg mb-4 text-sky-700 dark:text-sky-400 border-b border-sky-200 dark:border-sky-800 pb-2">
                  1. Address Bus
                </h3>
                <ul className="list-disc pl-5 space-y-3 text-sm flex-1">
                  <li>
                    <strong>Width:</strong> 16 bits wide (A0 to A15). This means
                    the 8085 can address a maximum of 2<sup>16</sup> = 65,536
                    memory locations (or 64 KB of memory).
                  </li>
                  <li>
                    <strong>Direction:</strong> Unidirectional. The
                    microprocessor always sends out the address to memory or
                    I/O; external devices never send addresses <em>to</em> the
                    microprocessor.
                  </li>
                  <li>
                    <strong>Structure:</strong> It is physically split. The
                    higher-order 8 bits (A8 - A15) have dedicated pins. The
                    lower-order 8 bits (A0 - A7) share pins with the data bus to
                    save space on the chip.
                  </li>
                </ul>
              </div>

              {/* Data Bus */}
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-lg border border-emerald-100 dark:border-emerald-800 shadow-sm flex flex-col">
                <h3 className="font-bold text-lg mb-4 text-emerald-700 dark:text-emerald-400 border-b border-emerald-200 dark:border-emerald-800 pb-2">
                  2. Data Bus
                </h3>
                <ul className="list-disc pl-5 space-y-3 text-sm flex-1">
                  <li>
                    <strong>Width:</strong> 8 bits wide (D0 to D7). This is why
                    the 8085 is called an "8-bit microprocessor" — it
                    manipulates and transfers 8 bits of data at a time.
                  </li>
                  <li>
                    <strong>Direction:</strong> Bidirectional. Data must flow{" "}
                    <em>into</em> the processor during a read operation
                    (fetching instructions or data) and flow <em>out of</em> the
                    processor during a write operation.
                  </li>
                  <li>
                    <strong>Multiplexing:</strong> The data lines (D0-D7) are
                    multiplexed with the lower address lines (A0-A7) to form the{" "}
                    <strong>AD0 - AD7</strong> bus. During T1, they act as the
                    address bus. For T2 and T3, they act as the data bus.
                  </li>
                </ul>
              </div>

              {/* Control Bus */}
              <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-lg border border-amber-100 dark:border-amber-800 shadow-sm flex flex-col">
                <h3 className="font-bold text-lg mb-4 text-amber-700 dark:text-amber-400 border-b border-amber-200 dark:border-amber-800 pb-2">
                  3. Control Bus
                </h3>
                <ul className="list-disc pl-5 space-y-3 text-sm flex-1">
                  <li>
                    <strong>Function:</strong> Unlike the address and data buses
                    (which carry identical types of information), the control
                    bus is a collection of individual timing and control
                    signals.
                  </li>
                  <li>
                    <strong>Components:</strong> It consists of lines like{" "}
                    <strong>RD'</strong> (Read active-low), <strong>WR'</strong>{" "}
                    (Write active-low), <strong>IO/M'</strong> (determines if
                    talking to Memory or I/O), and <strong>ALE</strong> (Address
                    Latch Enable).
                  </li>
                  <li>
                    <strong>Purpose:</strong> These signals tell the rest of the
                    hardware exactly <em>what</em> operation is happening and{" "}
                    <em>when</em> it is safe to put data on the bus or read data
                    from it.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-2xl fo  nt-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
            Demultiplexing AD0-AD7 using 74LS373 Latch
          </h2>
          <img
            src={demux}
            alt="Demultiplexing AD0-AD7 using 74LS373 Latch"
            className="img-placeholder"
          />
        </section>
      </div>
    ),
  },
  {
    id: "instructions",
    title: "2. Instruction Set & Addressing",
    icon: <Code className="w-5 h-5" />,
    content: (
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
            Instruction Byte Sizes
          </h2>
          <ul className="space-y-4 text-slate-700 dark:text-slate-300">
            <li>
              <strong>One-byte:</strong> Opcode and Operand in same byte.{" "}
              <em>Ex: MOV B,A | RLC | HLT | PUSH D</em>
            </li>
            <li>
              <strong>Two-byte:</strong> 1st byte is Opcode, 2nd byte is 8-bit
              Operand. <em>Ex: MVI A,32H | IN 02H | ADI 01H</em>
            </li>
            <li>
              <strong>Three-byte:</strong> 1st byte is Opcode, 2nd is lower
              8-bit address, 3rd is higher 8-bit address.{" "}
              <em>Ex: LXI B,2010H | JMP 3002H | LDA 1212H</em>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
            Addressing Modes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-slate-300">
            <div className="border border-slate-200 dark:border-slate-700 p-4 rounded bg-slate-50 dark:bg-slate-800/50">
              <strong>Immediate:</strong> 8/16 bit immediate data is specified
              in instruction. <em>MVI B, 20H</em>
            </div>
            <div className="border border-slate-200 dark:border-slate-700 p-4 rounded bg-slate-50 dark:bg-slate-800/50">
              <strong>Register:</strong> Specifies register/pair that contains
              data. <em>MOV A, B</em>
            </div>
            <div className="border border-slate-200 dark:border-slate-700 p-4 rounded bg-slate-50 dark:bg-slate-800/50">
              <strong>Direct:</strong> 8/16 bit address directly specified.{" "}
              <em>LDA 2000H | IN 08H</em>
            </div>
            <div className="border border-slate-200 dark:border-slate-700 p-4 rounded bg-slate-50 dark:bg-slate-800/50">
              <strong>Indirect:</strong> 16-bit memory address is provided via a
              register pair. <em>LDAX D | STAX D</em>
            </div>
            <div className="border border-slate-200 dark:border-slate-700 p-4 rounded bg-slate-50 dark:bg-slate-800/50 md:col-span-2">
              <strong>Implicit:</strong> Doesn't require operand; data is
              specified by opcode itself. <em>RAL | XCHG</em>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
            Core Instruction Groups
          </h2>

          <Collapsible title="1. Data Transfer Instructions (Flags NOT affected)">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th className="p-3 border border-slate-300 dark:border-slate-600">
                      Mnemonic
                    </th>
                    <th className="p-3 border border-slate-300 dark:border-slate-600">
                      Description
                    </th>
                    <th className="p-3 border border-slate-300 dark:border-slate-600">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      MOV
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Move data between registers or memory
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      MOV A, B<br />
                      MOV M, C
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      MVI
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Move 8-bit data immediately
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      MVI B, 45H
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      LDA
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Load Accumulator direct from 16-bit address
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      LDA 2000H
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      STA
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Store Accumulator direct to 16-bit address
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      STA 2000H
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      LHLD
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Load HL pair directly from memory
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      LHLD 2050H
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      SHLD
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Store HL pair directly to memory
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      SHLD 2050H
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      LDAX
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Load Accumulator indirectly (uses BC or DE)
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      LDAX B
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      STAX
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Store Accumulator indirectly (uses BC or DE)
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      STAX D
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      XCHG
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Exchange contents of HL and DE pairs
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      XCHG
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Collapsible>

          <Collapsible title="2. Arithmetic Instructions (Flags affected)">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th className="p-3 border border-slate-300 dark:border-slate-600">
                      Mnemonic
                    </th>
                    <th className="p-3 border border-slate-300 dark:border-slate-600">
                      Description
                    </th>
                    <th className="p-3 border border-slate-300 dark:border-slate-600">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      ADD / ADC
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Add reg/mem to A (ADC includes Carry)
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      ADD B<br />
                      ADC M
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      ADI / ACI
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Add immediate 8-bit to A (ACI includes Carry)
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      ADI 05H
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      SUB / SBB
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Subtract reg/mem from A (SBB includes Borrow)
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      SUB C<br />
                      SBB M
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      SUI / SBI
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Subtract immediate 8-bit from A
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      SUI 05H
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      INR / DCR
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Increment / Decrement 8-bit reg/mem by 1
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      INR B<br />
                      DCR M
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      INX / DCX
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Increment / Decrement 16-bit reg pair by 1
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      INX H<br />
                      DCX D
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      DAD
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Add 16-bit register pair to HL pair
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      DAD B
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      DAA
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Decimal Adjust Accumulator (for BCD math)
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      DAA
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Collapsible>

          <Collapsible title="3. Logical Instructions (Flags affected)">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 mb-4">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th className="p-3 border border-slate-300 dark:border-slate-600">
                      Mnemonic
                    </th>
                    <th className="p-3 border border-slate-300 dark:border-slate-600">
                      Description
                    </th>
                    <th className="p-3 border border-slate-300 dark:border-slate-600">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      ANA / ANI
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Logical AND with A
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      ANA B<br />
                      ANI 0FH
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      ORA / ORI
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Logical OR with A
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      ORA M<br />
                      ORI 0FH
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      XRA / XRI
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Logical Exclusive-OR (XOR) with A
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      XRA C<br />
                      XRI 80H
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      CMP / CPI
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Compare with A (sets flags based on A - Operand)
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      CMP B<br />
                      CPI 50H
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      RLC / RRC
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Rotate A Left / Right (Carry not involved)
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      RLC
                      <br />
                      RRC
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      RAL / RAR
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Rotate A Left / Right *through* Carry flag
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      RAL
                      <br />
                      RAR
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      CMA
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Complement Accumulator (1s complement)
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      CMA
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      CMC / STC
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Complement Carry / Set Carry flag to 1
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      CMC
                      <br />
                      STC
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Collapsible>

          <Collapsible title="4. Branching Instructions">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th className="p-3 border border-slate-300 dark:border-slate-600">
                      Mnemonic
                    </th>
                    <th className="p-3 border border-slate-300 dark:border-slate-600">
                      Description
                    </th>
                    <th className="p-3 border border-slate-300 dark:border-slate-600">
                      Conditions Available
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      JMP
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Unconditional Jump to 16-bit address
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      N/A
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      J_cond
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Conditional Jump to 16-bit address
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      JC/JNC, JZ/JNZ, JP/JM, JPE/JPO
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      CALL
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Unconditional subroutine call
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      N/A
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      C_cond
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Conditional subroutine call
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      CC/CNC, CZ/CNZ, CP/CM...
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      RET
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Unconditional Return from subroutine
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      N/A
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      R_cond
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Conditional Return from subroutine
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      RC/RNC, RZ/RNZ, RP/RM...
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      PCHL
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Jump to address specified by HL pair
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      N/A
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      RST n
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Software restart/interrupt (n = 0 to 7)
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      RST 5
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Collapsible>

          <Collapsible title="5. Machine Control, I/O, and Stack">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 mb-4">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th className="p-3 border border-slate-300 dark:border-slate-600">
                      Mnemonic
                    </th>
                    <th className="p-3 border border-slate-300 dark:border-slate-600">
                      Description
                    </th>
                    <th className="p-3 border border-slate-300 dark:border-slate-600">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      PUSH / POP
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Push/Pop register pair to/from the Stack
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      PUSH B<br />
                      POP H
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      XTHL
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Exchange top of Stack with HL pair
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      XTHL
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      SPHL
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Copy contents of HL pair into Stack Pointer
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      SPHL
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      IN / OUT
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Read from / Write to 8-bit I/O port
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      IN 80H
                      <br />
                      OUT 81H
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      EI / DI
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Enable / Disable Interrupts
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      EI
                      <br />
                      DI
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      HLT / NOP
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Halt execution / No Operation (timing delays)
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      HLT
                      <br />
                      NOP
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono font-bold">
                      SIM / RIM
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600">
                      Set / Read Interrupt Mask (serial I/O & ints)
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-600 font-mono">
                      SIM
                      <br />
                      RIM
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
              SIM
            </h4>
            <img
              src={sim}
              alt="SIM Instruction Accumulator Bit Formatting"
              className="img-placeholder mt-4"
            />
            <h4 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
              RIM
            </h4>
            <img
              src={rim}
              alt="RIM Instruction Accumulator Bit Formatting"
              className="img-placeholder mt-4"
            />
          </Collapsible>
        </section>
      </div>
    ),
  },
  {
    id: "timing",
    title: "3. Timing & Interfacing",
    icon: <Clock className="w-5 h-5" />,
    content: (
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
            Cycles & T-States
          </h2>
          <img
            src={comp}
            alt="Comparison Diagram: Instruction Cycle vs Machine Cycle vs T-States"
            className="img-placeholder"
          />
          <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Instruction Cycle:</strong> Time required to complete
              execution of an instruction (1 to 6 Machine Cycles).
            </li>
            <li>
              <strong>Machine Cycle:</strong> Time required to complete an
              operation like accessing memory/IO (3 to 6 T-States).
            </li>
            <li>
              <strong>T-States:</strong> One subdivision of operation performed
              in one clock period.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
            Control Signal Table
          </h2>
          <div className="overflow-x-auto my-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <table className="w-full text-left text-sm border-collapse text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">
                    Operations
                  </th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700 font-bold text-center text-slate-800 dark:text-slate-200">
                    IO/<span className="overline">M</span>
                  </th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700 font-bold text-center text-slate-800 dark:text-slate-200">
                    S<sub>0</sub>
                  </th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700 font-bold text-center text-slate-800 dark:text-slate-200">
                    S<sub>1</sub>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 bg-white dark:bg-slate-900">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 font-medium">Opcode Fetch</td>
                  <td className="p-3 text-center font-mono">0</td>
                  <td className="p-3 text-center font-mono">1</td>
                  <td className="p-3 text-center font-mono">1</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 font-medium">Memory Read</td>
                  <td className="p-3 text-center font-mono">0</td>
                  <td className="p-3 text-center font-mono">1</td>
                  <td className="p-3 text-center font-mono">0</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 font-medium">Memory Write</td>
                  <td className="p-3 text-center font-mono">0</td>
                  <td className="p-3 text-center font-mono">0</td>
                  <td className="p-3 text-center font-mono">1</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 font-medium">I/O Read</td>
                  <td className="p-3 text-center font-mono">1</td>
                  <td className="p-3 text-center font-mono">1</td>
                  <td className="p-3 text-center font-mono">0</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 font-medium">I/O Write</td>
                  <td className="p-3 text-center font-mono">1</td>
                  <td className="p-3 text-center font-mono">0</td>
                  <td className="p-3 text-center font-mono">1</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 font-medium">Interrupt Ack.</td>
                  <td className="p-3 text-center font-mono">1</td>
                  <td className="p-3 text-center font-mono">1</td>
                  <td className="p-3 text-center font-mono">1</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 font-medium">Halt</td>
                  <td className="p-3 text-center text-xs text-slate-500 dark:text-slate-400">
                    High Impedance
                  </td>
                  <td className="p-3 text-center font-mono">0</td>
                  <td className="p-3 text-center font-mono">0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
            Timing Diagrams
          </h2>

          <h3 className="text-xl font-semibold mb-2 mt-6 text-slate-800 dark:text-slate-200">
            1. Opcode Fetch Machine Cycle
          </h3>
          <img
            src={opcode}
            alt="Timing Diagram for Opcode Fetch"
            className="img-placeholder"
          />

          <h3 className="text-xl font-semibold mb-2 mt-6 text-slate-800 dark:text-slate-200">
            2. Memory Read & Memory Write
          </h3>
          <img
            src={memr}
            alt="Timing Diagram for Memory Read Cycle"
            className="img-placeholder"
          />
          <img
            src={memw}
            alt="Timing Diagram for Memory Write Cycle"
            className="img-placeholder"
          />

          <h3 className="text-xl font-semibold mb-2 mt-6 text-slate-800 dark:text-slate-200">
            3. I/O Read & I/O Write
          </h3>
          <img
            src={ior}
            alt="Timing Diagram for I/O Read Cycle"
            className="img-placeholder"
          />
          <img
            src={iow}
            alt="Timing Diagram for I/O Write Cycle"
            className="img-placeholder"
          />

          <h3 className="text-xl font-semibold mb-2 mt-6 text-slate-800 dark:text-slate-200">
            Specific Instruction Timing
          </h3>
          <h4 className="text-xl font-semibold mb-2 mt-6 text-slate-800 dark:text-slate-200">
            MOV B, M
          </h4>
          <img
            src={movbm}
            alt="Timing Diagram for MOV B, M"
            className="img-placeholder"
          />
          <h4 className="text-xl font-semibold mb-2 mt-6 text-slate-800 dark:text-slate-200">
            MVI A, 32H
          </h4>
          <img
            src={mvia}
            alt="Timing Diagram for MVI A, 32H"
            className="img-placeholder"
          />
          <h4 className="text-xl font-semibold mb-2 mt-6 text-slate-800 dark:text-slate-200">
            OUT 02H / IN 02H
          </h4>
          <img
            src={outh}
            alt="Timing Diagram for OUT 02H"
            className="img-placeholder"
          />
          <img
            src={inh}
            alt="Timing Diagram for IN 02H"
            className="img-placeholder"
          />
        </section>
      </div>
    ),
  },
  {
    id: "programs",
    title: "4. Assembly Programs",
    icon: <BookOpen className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
          All 30 Assembly Programs
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Comprehensive list of all ALPs discussed in the Unit 5 material.
        </p>

        <div className="space-y-4">
          {programsUnit5.map((prog) => (
            <Collapsible key={prog.id} title={`${prog.id}. ${prog.title}`}>
              <pre className="text-sm font-mono text-indigo-700 dark:text-indigo-300 m-0 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg overflow-x-auto border border-slate-200 dark:border-slate-700">
                {prog.code}
              </pre>
            </Collapsible>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "8086",
    title: "5. The 8086 Microprocessor",
    icon: <LayoutDashboard className="w-5 h-5" />,
    content: (
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
            8086 Architecture (BIU & EU)
          </h2>
          <img
            src={arch}
            alt="8086 Microprocessor Architecture Block Diagram"
            className="img-placeholder"
          />
          <p className="mt-4 text-slate-700 dark:text-slate-300">
            The 8086 introduces <strong>Pipelining</strong>, splitting into two
            separate units working simultaneously to speed up execution.
          </p>

          <div className="mb-8">
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              This is the internal architecture block diagram of the{" "}
              <strong>Intel 8086 Microprocessor</strong>. It visually represents
              the biggest conceptual leap from the 8085 to the 8086:{" "}
              <strong>Pipelining</strong>. The processor is divided into two
              completely separate functional units that operate simultaneously
              to speed up execution.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-slate-700 dark:text-slate-300">
              {/* Bus Interface Unit */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-lg border border-indigo-100 dark:border-indigo-800 shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-400">
                  1. Bus Interface Unit (BIU)
                </h3>
                <p className="mb-4 text-sm">
                  Think of the BIU as the "Fetcher and Communicator." It is the
                  only part that connects to the outside world (memory and I/O
                  devices) to calculate addresses, fetch instructions, and
                  read/write data.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong>Segment Registers (ES, CS, SS, DS):</strong> Four
                    16-bit registers holding the base addresses for the 64 KB
                    logical segments in memory.
                  </li>
                  <li>
                    <strong>Instruction Pointer (IP):</strong> Holds the 16-bit
                    offset address of the next instruction to be fetched.
                  </li>
                  <li>
                    <strong>The Adder (&Sigma;):</strong> Dedicated math unit
                    inside the BIU that shifts the segment base address and adds
                    the offset address to generate the 20-bit physical address.
                  </li>
                  <li>
                    <strong>Instruction Stream Byte Queue:</strong> A 6-byte
                    FIFO buffer. While the EU executes code, the BIU looks ahead
                    and pre-fetches the next 6 bytes of machine code from
                    memory.
                  </li>
                </ul>
              </div>

              {/* Execution Unit */}
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-lg border border-emerald-100 dark:border-emerald-800 shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-emerald-700 dark:text-emerald-400">
                  2. Execution Unit (EU)
                </h3>
                <p className="mb-4 text-sm">
                  Think of the EU as the "Worker." It doesn't connect to
                  external buses. It simply pulls instructions from the BIU's
                  6-byte queue, decodes them, and performs calculations.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong>Control System:</strong> Grabs machine code from the
                    instruction queue, decodes it, and generates internal timing
                    signals to execute it.
                  </li>
                  <li>
                    <strong>General Purpose Registers (AX, BX, CX, DX):</strong>{" "}
                    Four 16-bit registers that can be split into eight
                    independent 8-bit registers (AH/AL, BH/BL, etc.) for
                    flexibility.
                  </li>
                  <li>
                    <strong>
                      Pointers & Index Registers (SP, BP, SI, DI):
                    </strong>{" "}
                    Hold offset addresses used during execution to locate
                    specific data within the segments.
                  </li>
                  <li>
                    <strong>ALU:</strong> Handles 16-bit addition, subtraction,
                    multiplication, division, and logical operations.
                  </li>
                  <li>
                    <strong>Flags:</strong> A 16-bit register holding status
                    flags (Zero, Carry, Sign) and control flags that dictate
                    processor behavior.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
                How they work together:
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Instead of sequential Fetch &rarr; Execute &rarr; Fetch (like
                the 8085), the 8086 overlaps operations. The EU is constantly
                executing code from the queue via the <strong>A-BUS</strong>,
                while the BIU simultaneously uses the <strong>B-BUS</strong> and{" "}
                <strong>C-BUS</strong> to fetch the next instructions from
                memory and keep that queue full.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
            Memory Segmentation
          </h2>
          <img
            src={segment}
            alt="8086 Memory Segmentation and Physical Address Calculation Diagram"
            className="img-placeholder"
          />
          <p className="mt-4 mb-4 text-slate-700 dark:text-slate-300">
            <strong>Problem:</strong> 8086 has a 20-bit address bus (1 MB
            physical memory) but internal registers are only 16-bit (max 64 KB).
            <br />
            <strong>Solution:</strong> Divide 1 MB memory into logical chunks
            called <strong>Segments</strong> of 64 KB each. The processor uses a
            combination of two 16-bit registers to pinpoint one exact 20-bit
            physical address.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-800 dark:text-slate-200">
            Segment Registers & Default Offsets
          </h3>
          <div className="overflow-x-auto mb-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <table className="w-full text-left text-sm border-collapse text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700 font-bold">
                    Segment Name
                  </th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700 font-bold">
                    Register
                  </th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700 font-bold">
                    Default Offset(s)
                  </th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700 font-bold">
                    Main Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 bg-white dark:bg-slate-900">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 font-medium">Code</td>
                  <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">
                    CS
                  </td>
                  <td className="p-3 font-mono text-xs">IP</td>
                  <td className="p-3">
                    Stores the actual executable instructions of your program.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 font-medium">Data</td>
                  <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">
                    DS
                  </td>
                  <td className="p-3 font-mono text-xs">BX, SI, DI</td>
                  <td className="p-3">
                    Stores the variables and standard data your program uses.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 font-medium">Stack</td>
                  <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">
                    SS
                  </td>
                  <td className="p-3 font-mono text-xs">SP, BP</td>
                  <td className="p-3">
                    Used for temporary storage, subroutines, and interrupts.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 font-medium">Extra</td>
                  <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">
                    ES
                  </td>
                  <td className="p-3 font-mono text-xs">DI</td>
                  <td className="p-3">
                    An additional data segment, heavily used during string
                    manipulation.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-lg font-mono text-center mb-6 border border-slate-300 dark:border-slate-600 shadow-inner">
            <h3 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Physical Address Calculation
            </h3>
            <p className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100">
              Physical Address = (Segment Register × 10H) + Offset
            </p>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-lg border border-indigo-100 dark:border-indigo-800 shadow-sm mb-6 text-slate-700 dark:text-slate-300">
            <h3 className="font-bold text-lg mb-3 text-indigo-700 dark:text-indigo-400">
              Example Calculation
            </h3>
            <p className="text-sm mb-3">
              Let's calculate where the next instruction is being fetched from
              if{" "}
              <strong className="font-mono bg-indigo-100 dark:bg-indigo-900/50 px-1 rounded">
                CS = 2000H
              </strong>{" "}
              and{" "}
              <strong className="font-mono bg-indigo-100 dark:bg-indigo-900/50 px-1 rounded">
                IP = 0045H
              </strong>
              :
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm font-mono bg-white dark:bg-slate-900 p-4 rounded border border-slate-200 dark:border-slate-700">
              <li>
                Shift Segment Base: 2000H × 10H ={" "}
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  20000H
                </span>
              </li>
              <li>Add the Offset: 20000H + 0045H</li>
              <li>
                Final 20-bit Address ={" "}
                <span className="font-bold text-indigo-600 dark:text-indigo-400 border-b border-indigo-600 dark:border-indigo-400 pb-0.5">
                  20045H
                </span>
              </li>
            </ol>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-800 dark:text-slate-200">
            Advantages of Segmentation
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 text-sm">
            <li>
              <strong>Relocatability:</strong> Programs can be loaded anywhere
              in memory simply by changing the Segment Register base address.
              The internal offset code doesn't need to change.
            </li>
            <li>
              <strong>Separation:</strong> It keeps code, data, and stack areas
              completely separate, preventing a program from accidentally
              overwriting its own instructions with data.
            </li>
            <li>
              <strong>Extended Memory:</strong> While a single segment limits a
              program to 64KB, you can write programs larger than 64KB by
              modifying segment registers on the fly during execution.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">
            8085 vs 8086 Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="p-3 border border-slate-300 dark:border-slate-600">
                    Feature
                  </th>
                  <th className="p-3 border border-slate-300 dark:border-slate-600">
                    Intel 8085
                  </th>
                  <th className="p-3 border border-slate-300 dark:border-slate-600">
                    Intel 8086
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-slate-300 dark:border-slate-600 font-bold">
                    Processor Size
                  </td>
                  <td className="p-3 border border-slate-300 dark:border-slate-600">
                    8-bit
                  </td>
                  <td className="p-3 border border-slate-300 dark:border-slate-600">
                    16-bit
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-300 dark:border-slate-600 font-bold">
                    Address Bus / Max Mem
                  </td>
                  <td className="p-3 border border-slate-300 dark:border-slate-600">
                    16-bit / 64 KB
                  </td>
                  <td className="p-3 border border-slate-300 dark:border-slate-600">
                    20-bit / 1 MB
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-300 dark:border-slate-600 font-bold">
                    Data Bus
                  </td>
                  <td className="p-3 border border-slate-300 dark:border-slate-600">
                    8-bit
                  </td>
                  <td className="p-3 border border-slate-300 dark:border-slate-600">
                    16-bit
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-300 dark:border-slate-600 font-bold">
                    Pipelining
                  </td>
                  <td className="p-3 border border-slate-300 dark:border-slate-600">
                    No (Sequential)
                  </td>
                  <td className="p-3 border border-slate-300 dark:border-slate-600">
                    Yes (BIU fetches while EU executes)
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-300 dark:border-slate-600 font-bold">
                    Instruction Queue
                  </td>
                  <td className="p-3 border border-slate-300 dark:border-slate-600">
                    None
                  </td>
                  <td className="p-3 border border-slate-300 dark:border-slate-600">
                    6-byte FIFO queue
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-300 dark:border-slate-600 font-bold">
                    Memory Segmentation
                  </td>
                  <td className="p-3 border border-slate-300 dark:border-slate-600">
                    No (Linear memory)
                  </td>
                  <td className="p-3 border border-slate-300 dark:border-slate-600">
                    Yes (64 KB segments)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    ),
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState(contentData[0].id);
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Initialize sidebar based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize(); // set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const activeContent = contentData.find((s) => s.id === activeSection);

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${darkMode ? "dark bg-slate-900" : "bg-slate-50"}`}
    >
      <FontStyles />

      {/* TOP NAVIGATION BAR */}
      <nav className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
            <Cpu className="w-7 h-7" />
            <h1 className="text-xl font-bold tracking-tight hidden sm:block text-slate-800 dark:text-slate-200">
              MPI Notes Master
            </h1>
            <h1 className="text-xl font-bold tracking-tight sm:hidden">
              MPI Notes
            </h1>
          </div>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </nav>

      <div className="flex w-full relative overflow-hidden">
        {/* MOBILE SIDEBAR BACKDROP */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 flex flex-col shrink-0
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-72 translate-x-0 border-r border-slate-200 dark:border-slate-800" : "w-72 -translate-x-full md:w-0 md:translate-x-0 md:border-none overflow-hidden"}
          md:static md:h-[calc(100vh-73px)] md:sticky md:top-[73px]
        `}
        >
          <div className="p-4 flex items-center justify-between md:hidden border-b border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Menu
            </span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 flex-1 overflow-y-auto w-72">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-3">
              Table of Contents
            </p>
            <nav className="space-y-1">
              {contentData.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false); // auto-close only on mobile
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-medium"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span
                    className={`${activeSection === section.id ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500"}`}
                  >
                    {section.icon}
                  </span>
                  <span className="flex-1 text-sm">{section.title}</span>
                  {activeSection === section.id && (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 min-w-0 bg-white dark:bg-slate-900 transition-colors duration-200 md:my-4 md:mr-4 md:rounded-xl md:border border-slate-200 dark:border-slate-800 md:shadow-sm h-full md:min-h-[calc(100vh-105px)]">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tight text-slate-900 dark:text-white">
              {activeContent.title}
            </h1>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              {activeContent.content}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
