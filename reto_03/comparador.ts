interface Instrumento {
  debito: string;
  apertura: number;
  cheques: boolean;
  comisionAnual: number;
}

interface Data {
  institucionFinanciera: string;
  instrumento: Instrumento[];
}

const data: Data[] = [
  {
    institucionFinanciera: "BBVA",
    instrumento: [
      {
        debito: "BBVA Nomina",
        apertura: 0.0,
        cheques: false,
        comisionAnual: 350.0,
      },
    ],
  },
  {
    institucionFinanciera: "HSBC",
    instrumento: [
      {
        debito: "HSBC Zero",
        apertura: 0.0,
        cheques: false,
        comisionAnual: 0.0,
      },
    ],
  },
];

function renderTableComparison(data: Data[]) {
  const container = document.getElementById("table-container");

  // Create the table element
  const table = document.createElement("table");

  // Create the table header
  const headerRow = document.createElement("tr");
  const header1 = document.createElement("th");
  header1.textContent = "Institucion Financiera";
  const header2 = document.createElement("th");
  header2.textContent = "Instrumento";
  headerRow.appendChild(header1);
  headerRow.appendChild(header2);
  table.appendChild(headerRow);

  // Create table rows for each data element
  data.forEach((item) => {
    const row = document.createElement("tr");
    const cell1 = document.createElement("td");
    cell1.textContent = item.institucionFinanciera;
    const cell2 = document.createElement("td");
    cell2.textContent = item.instrumento[0].debito;
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
  });

  // Append the table to the container
  container!.appendChild(table);
}

// Call the function to render the table comparison
renderTableComparison(data);
