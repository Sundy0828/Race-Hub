export class Guard {
  public static againstNull(parameter: any, name: string = "parameter") {
    if (parameter === null || parameter === undefined) {
      throw new Error(
        `ArgumentNullException: '${name}' was null or undefined.`
      );
    }
  }

  public static againstNullOrWhitespace(
    parameter: string | null | undefined,
    name: string = "string parameter"
  ) {
    if (typeof parameter !== "string" || parameter.trim().length === 0) {
      throw new Error(
        `ArgumentException: '${name}' was null, empty, or whitespace.`
      );
    }
  }

  public static againstInvalidDate(
    parameter: Date | null | undefined,
    name: string = "date"
  ) {
    if (!(parameter instanceof Date) || isNaN(parameter.getTime())) {
      throw new Error(`ArgumentException: '${name}' was not a valid Date.`);
    }
  }

  public static againstNegativeNumber(
    parameter: number | null | undefined,
    name: string = "number"
  ) {
    if (typeof parameter !== "number" || parameter < 0) {
      throw new Error(`ArgumentException: '${name}' was negative.`);
    }
  }

  public static against(
    condition: boolean,
    message: string = "Guarded condition failed."
  ) {
    if (condition) {
      throw new Error(`ArgumentException: ${message}`);
    }
  }
}
