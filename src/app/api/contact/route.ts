import { NextRequest, NextResponse } from "next/server";
import { ingestLeadToPipeFlow, mapPipeFlowError } from "@/lib/pipeflow";
import type { PipeFlowLeadPayload } from "@/types/lead";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, source, conversationSummary, identifiedPain, suggestedSolution, interestLevel } = body;

    // Validação básica
    if (!name || !email) {
      return NextResponse.json(
        { error: "Nome e e-mail são obrigatórios" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "E-mail inválido" },
        { status: 400 }
      );
    }

    // Construir payload para PipeFlow
    const leadPayload: PipeFlowLeadPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim(),
      source: source || "form",
      conversationSummary,
      identifiedPain,
      suggestedSolution,
      interestLevel,
      metadata: {
        timestamp: new Date().toISOString(),
        userAgent: request.headers.get("user-agent"),
        origin: request.headers.get("origin"),
      },
    };

    // Enviar para PipeFlow
    const result = await ingestLeadToPipeFlow(leadPayload);

    return NextResponse.json(
      {
        success: true,
        message: "Lead capturado com sucesso",
        leadId: result.leadId,
      },
      { status: 200 }
    );
  } catch (error) {
    // Mapear erro de PipeFlow para resposta apropriada
    const { status, message } = mapPipeFlowError(error);

    console.error("[API Contact] Erro ao processar lead:", {
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}
