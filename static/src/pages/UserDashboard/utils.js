export const userTypeTranslation = id => {
  switch (id) {
    case 1:
      return "Colaborador";
    case 2:
      return "Curador";
    case 3:
      return "Administrador";
    default:
      return "Colaborador";
  }
};

export const userRolTranslation =id => {
  switch (id) {
    case 1:
      return "Alumno";
    case 2:
      return "Ex-Alumno";
    case 3:
      return "Académico";
    case 3:
      return "Ex-Académico";
    case 3:
      return "Funcionario";
    case 3:
      return "Externo";
    default:
      return "Externo";
  }
};
