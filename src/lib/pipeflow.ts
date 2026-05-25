/**
 * PipeFlow API Client
 * Integração com infraestrutura proprietária de Nexus Labs
 * Envia leads enriquecidos via Bearer Token
 */

import { PipeFlowLeadPayload, PipeFlowResponse } from "@/types/lead";

/**
 * Envia lead para PipeFlow CRM
 * @param payload Dados do lead (básico ou enriquecido)
 * @returns Resposta da API ou erro mapeado
 */
export async function ingestLeadToPipeFlow(
  payload: PipeFlowLeadPayload
): Promise<PipeFlowResponse> {
  const apiUrl = process.env.PIPEFLOW_API_URL;
  const token = process.env.PIPEFLOW_INGEST_TOKEN;

  // Validação: env vars ausentes
  if (!apiUrl || !token) {
    console.error("[PipeFlow] Env vars ausentes: PIPEFLOW_API_URL e/ou PIPEFLOW_INGEST_TOKEN");
    throw new Error("PIPEFLOW_ENV_MISSING");
  }

  try {
    const endpoint = `${apiUrl}/api/leads/ingest`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    // Sucesso
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        leadId: data.leadId,
        message: "Lead capturado com sucesso",
      };
    }

    // Erro 402: Billing/plano insuficiente — não expor ao visitante
    if (response.status === 402) {
      console.error("[PipeFlow] Erro 402: Limite de plano atingido");
      throw new Error("PIPEFLOW_BILLING_LIMIT");
    }

    // Erro 401/403: Token inválido ou expirado
    if (response.status === 401 || response.status === 403) {
      console.error("[PipeFlow] Erro 401/403: Token inválido ou expirado");
      throw new Error("PIPEFLOW_AUTH_FAILED");
    }

    // Erro 404: Endpoint não existe
    if (response.status === 404) {
      console.error("[PipeFlow] Erro 404: Endpoint não encontrado");
      throw new Error("PIPEFLOW_ENDPOINT_NOT_FOUND");
    }

    // Erro 5xx: Servidor PipeFlow indisponível
    if (response.status >= 500) {
      console.error(`[PipeFlow] Erro ${response.status}: Servidor indisponível`);
      throw new Error("PIPEFLOW_SERVER_ERROR");
    }

    // Outros erros
    console.error(`[PipeFlow] Erro inesperado: ${response.status}`);
    throw new Error("PIPEFLOW_UNKNOWN_ERROR");
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    console.error("[PipeFlow] Erro na integração:", error);
    throw new Error("PIPEFLOW_INTEGRATION_ERROR");
  }
}

/**
 * Mapeia erro de PipeFlow para HTTP status code apropriado
 * Oculta detalhes técnicos do visitante
 */
export function mapPipeFlowError(error: unknown): {
  status: number;
  message: string;
} {
  const errorMessage = error instanceof Error ? error.message : String(error);

  switch (errorMessage) {
    case "PIPEFLOW_ENV_MISSING":
      return {
        status: 503,
        message: "Serviço temporariamente indisponível",
      };

    case "PIPEFLOW_BILLING_LIMIT":
    case "PIPEFLOW_SERVER_ERROR":
    case "PIPEFLOW_INTEGRATION_ERROR":
      return {
        status: 503,
        message: "Serviço temporariamente indisponível",
      };

    case "PIPEFLOW_AUTH_FAILED":
      return {
        status: 502,
        message: "Erro ao processar requisição",
      };

    case "PIPEFLOW_ENDPOINT_NOT_FOUND":
      return {
        status: 502,
        message: "Erro ao processar requisição",
      };

    default:
      return {
        status: 500,
        message: "Erro interno do servidor",
      };
  }
}
