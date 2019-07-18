// respuesta de la petición REST
export interface DBresp {
  ok: boolean;
  count?: number;
  data?: Array<object>[];
  err?: any;
}

// parametros permitidos en una consulta
export interface DBquery {
  headers?: any;
  campos?: string;
  where?: string;
  limit?: number;
  offset?: number;
  // valor para Update
  nombreID?: string;
  nombreCampo?: string;
  set?: string;
  // valor para insert
  values?: string;
}

// Lista de elementos de una tabla fija
export interface Ilista {
  ID: number;
  campo: string;
}


// datos devueltos en las actualizaciones y borrados
export interface DBActualizaciones {
  ok: boolean;
  data: {
      fieldCount: number; // 0,
      affectedRows: number; // 1,
      insertId: number; // 36,
      info: string; // "",
      serverStatus: number; // 2,
      warningStatus: number; // 0,
      changedRows?: number; // 1 // únicamente insercciones
  }
}

export interface Compania {
  IDCOMPANIA: number;
  COMPANIA: string;
}
