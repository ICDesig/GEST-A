export interface DryResultatsInterface<T = any> {
  status_code: number;
  status: boolean;         // Code HTTP ou booléen de statut
  message: string;         // Message de retour
  success?: boolean;       // Optionnel : succès ou échec
  data: T;                 // Les données (liste ou objet)

  // Si T est un tableau, on masque `element`
  element?: T extends Array<any> ? never : T;

  Pagination?: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    prev?: number | null;
    next?: number | null;
  };

  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}
