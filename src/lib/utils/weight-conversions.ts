enum WeightUnit {
  KG = "KG",
  LBS = "LBS",
}

export const toKg = (weight: number, unit: WeightUnit) =>
  unit === WeightUnit.LBS ? weight / 2.205 : weight;

export const fromKg = (weight: number, unit: WeightUnit) =>
  unit === WeightUnit.LBS ? weight * 2.205 : weight;
