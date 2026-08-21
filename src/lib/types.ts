// spanish-cities-info no reexporta el tipo City desde su entrypoint público
// (solo lo usa internamente en las firmas de las funciones), así que se
// replica aquí la forma documentada en su README/types.d.ts.
export interface City {
  name: string;
  ineCode: string;
  province: string;
  community: string;
  latitude: number;
  longitude: number;
}
