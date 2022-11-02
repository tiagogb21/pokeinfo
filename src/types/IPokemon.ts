interface IAbility {
  name: string;
  url: string;
}

interface IType {
  name: string;
  url: string;
}

interface IStatsName {
  name: string;
}

interface IStats {
  baseState: number;
  stat: IStatsName;
}

export interface IPokemon {
  abilities: IAbility[];
  height: number;
  id: number;
  stats: IStats[];
  sprites: string; //other.home.official-artwork"
  types: IType[];
  weight: number;
}
