export     const getStatusColor = (estado: any) => {
    switch (estado) {
      case "Activo":
        return "#4CAF50";
      case "Pagado":
        return "#2196F3";
      case "Atrasado":
        return "#FFC107";
      default:
        return "#9E9E9E";
    }
  };