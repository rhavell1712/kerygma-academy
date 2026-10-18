"use client";

import { trackLeadAction } from "@/app/actions/leads";

export type LeadOrigem = "modal" | "flutuante" | "como-funciona";

export function trackLead(mentoria: string, origem: LeadOrigem) {
  void trackLeadAction(mentoria, origem);
}
