"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface InvoiceItem {
  id: string | number;
  gameTitle: string;
  platform?: string;
  playMode?: "offline" | "online";
  quantity: number;
  price: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  items: InvoiceItem[];
  totalAmount: number;
  transactionId?: string;
  paymentMethod?: string;
}

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvoiceData;
}

export default function InvoiceModal({ isOpen, onClose, data }: InvoiceModalProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/75 backdrop-blur-md print:p-0 print:bg-white print:static print:overflow-visible">
        {/* Backdrop for closing */}
        <div
          className="fixed inset-0 print:hidden cursor-pointer"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-[800px] my-auto bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none print:w-full print:max-w-none print:my-0"
        >
          {/* Action Toolbar (Hidden during Print) */}
          <div className="flex items-center justify-between px-6 py-3 bg-slate-900 text-white border-b border-slate-800 print:hidden">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <span>🧾</span>
              <span>Official Tax Invoice</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-1.5 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
                </svg>
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
                aria-label="Close invoice"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Printable Invoice Sheet (Matching User Template) */}
          <div
            ref={invoiceRef}
            className="relative bg-white text-slate-900 font-sans select-text overflow-hidden print:w-full print:m-0"
            style={{
              minHeight: "950px",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust: "exact",
            }}
          >
            {/* Top Dark Header */}
            <div
              className="px-8 py-8 sm:px-10 sm:py-9 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
              style={{ backgroundColor: "#1e293b", color: "#ffffff" }}
            >
              {/* Brand Logo & Name */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 p-1.5 border border-white/20 flex items-center justify-center flex-shrink-0 shadow">
                  <img
                    src="/images/logo/logo-mark.png"
                    alt="Millennium Games"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="h-10 w-[2px] bg-white/30 hidden sm:block" />
                <div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-wider uppercase text-white leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                    WARNER &amp; SPENCER<br />
                    <span className="text-amber-400 text-xs tracking-widest font-bold block mt-0.5">
                      MILLENNIUM GAMES STORE
                    </span>
                  </h1>
                </div>
              </div>

              {/* Customer Details */}
              <div className="text-left sm:text-right text-xs space-y-1 text-slate-300 self-stretch sm:self-auto">
                <div>
                  <span className="text-amber-400 font-bold">To : </span>
                  <span className="text-white font-semibold">{data.customerName || "Valued Customer"}</span>
                </div>
                <div>
                  <span className="text-amber-400 font-bold">Platform : </span>
                  <span className="text-white">PC Digital Games Delivery</span>
                </div>
                <div>
                  <span className="text-amber-400 font-bold">Mail : </span>
                  <span className="text-slate-200">{data.customerEmail || "customer@example.com"}</span>
                </div>
              </div>
            </div>

            {/* Main Content Area with Left Amber Ribbon and Table */}
            <div className="relative flex items-stretch">
              {/* Left Amber Ribbon with Vertical INVOICE text */}
              <div
                className="w-20 sm:w-28 flex-shrink-0 flex items-center justify-center"
                style={{
                  backgroundColor: "#f5a623",
                  minHeight: "380px",
                }}
              >
                <span
                  className="text-white font-black tracking-[0.25em] text-3xl sm:text-4xl uppercase select-none"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    fontFamily: "var(--font-outfit)",
                    textShadow: "0 2px 4px rgba(0,0,0,0.15)",
                  }}
                >
                  INVOICE
                </span>
              </div>

              {/* Right Table Container */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  {/* Table Header */}
                  <div
                    className="grid grid-cols-12 px-4 py-2.5 rounded-t-lg text-xs font-black uppercase tracking-wider text-slate-950"
                    style={{ backgroundColor: "#f5a623" }}
                  >
                    <div className="col-span-6 font-bold">DESC</div>
                    <div className="col-span-2 text-center font-bold">QTY</div>
                    <div className="col-span-2 text-right font-bold">PRICE</div>
                    <div className="col-span-2 text-right font-bold">TOTAL</div>
                  </div>

                  {/* Table Rows */}
                  <div className="divide-y divide-slate-200 border-x border-b border-slate-200 text-xs">
                    {data.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-12 px-4 py-3.5 items-center hover:bg-slate-50 transition-colors"
                      >
                        <div className="col-span-6 pr-2">
                          <p className="font-bold text-slate-800 text-sm">{item.gameTitle}</p>
                          <p className="text-[10.5px] text-slate-500 font-medium">
                            {item.platform?.toUpperCase()} • {item.playMode === "online" ? "Online Multiplayer" : "Offline Campaign Story"} Edition
                          </p>
                        </div>
                        <div className="col-span-2 text-center font-semibold text-slate-700">
                          {item.quantity}
                        </div>
                        <div className="col-span-2 text-right font-semibold text-slate-700">
                          ₹{item.price.toFixed(2)}
                        </div>
                        <div className="col-span-2 text-right font-bold text-slate-900">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total Summary Row */}
                  <div className="flex justify-end items-center gap-8 px-4 py-4 mt-2">
                    <span className="text-sm font-black text-slate-900 tracking-wider uppercase">
                      TOTAL
                    </span>
                    <span className="text-xl font-black text-slate-950" style={{ fontFamily: "var(--font-outfit)" }}>
                      ₹{data.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Bank & Account Info */}
            <div className="px-8 sm:px-10 py-5 text-xs text-slate-700 space-y-1">
              <p className="font-semibold text-slate-800">
                Payment Gateway: <span className="font-bold text-slate-950">{data.paymentMethod || "Razorpay Secure Payments"}</span>
              </p>
              <p className="font-semibold text-slate-800">
                Merchant / Account Name: <span className="font-bold text-slate-950">Millennium Games</span>
              </p>
              <p className="font-semibold text-slate-800">
                Transaction Status: <span className="font-bold text-emerald-600">PAID &amp; CONFIRMED (Ref: {data.transactionId || "RZP-PAY-SUCCESS"})</span>
              </p>
            </div>

            {/* Bottom Cards: Invoice Metadata & Signatory */}
            <div className="px-8 sm:px-10 pb-8 grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
              {/* Invoice Numbers Amber Box */}
              <div
                className="sm:col-span-8 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs font-medium shadow-sm"
                style={{ backgroundColor: "#f5a623", color: "#1e293b" }}
              >
                <div>
                  <span className="block text-[11px] font-bold text-slate-900">Invoice No :</span>
                  <span className="text-sm font-black text-slate-950">{data.invoiceNumber}</span>
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-900">Invoice Date :</span>
                  <span className="text-xs font-black text-slate-950">{data.invoiceDate}</span>
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-900">Due Date :</span>
                  <span className="text-xs font-black text-slate-950">{data.dueDate || "Paid on Receipt"}</span>
                </div>
              </div>

              {/* Authorised Signatory */}
              <div className="sm:col-span-4 text-center sm:text-right space-y-1.5">
                <div className="w-36 h-[2px] bg-slate-400 ml-auto mr-auto sm:mr-0 mb-2" />
                <p className="text-sm font-black text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>
                  Chad Gibbons
                </p>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Authorised Signatory
                </p>
              </div>
            </div>

            {/* Bottom Dark Footer Bar */}
            <div
              className="px-8 py-5 sm:px-10 text-[11.5px] flex flex-col sm:flex-row justify-between items-center gap-3 text-slate-300"
              style={{ backgroundColor: "#1e293b" }}
            >
              <div className="flex items-center gap-2">
                <span className="text-amber-400">📞</span>
                <span>+91 8089406346</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400">✉️</span>
                <span>millenniumpcgames@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400">📍</span>
                <span>Meencut PO Pallivasal, Munnar, Kerala - 685565</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
