/**
 * Erro de domínio com status HTTP. Lançado por models/controllers
 * e convertido em resposta JSON pelo errorHandler.
 */
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly fields?: Record<string, string>
  ) {
    super(message);
    this.name = "HttpError";
  }
}
