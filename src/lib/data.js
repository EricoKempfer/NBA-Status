export async function fetchStaticData() {
  const { createClient } = await import("@libsql/client");

  const client = createClient({
    url: process.env.TURSO_DB_URL,
    authToken: process.env.TURSO_DB_AUTH_TOKEN,
  });

  const tablesResult = await client.execute(
    "SELECT name FROM sqlite_master WHERE type='table';"
  );

  const allColumns = {};

  for (const table of tablesResult.rows) {
    const tableName = table.name;

    const columnsResult = await client.execute(
      `PRAGMA table_info(${tableName})`
    );

    const sampleResult = await client.execute(
      `SELECT * FROM ${tableName} LIMIT 2`
    );

    const columnsWithSamples = columnsResult.rows.map(column => {
      const columnName = column.name;
      return {
        ...column,
        sampleData: sampleResult.rows.map(row => row[columnName])
      };
    });

    allColumns[tableName] = columnsWithSamples;
  }

  let staticPlayers = [];
  try {
    const playersResult = await client.execute(
      "SELECT * FROM common_player_info"
    );
    staticPlayers = playersResult.rows.map(player => ({
      label: player.display_first_last,
      value: player.person_id,
      playerData: player
    }));
  } catch (error) {
    console.error("Error fetching players:", error);
  }

  return {
    staticTables: tablesResult.rows,
    staticColumns: allColumns,
    staticPlayers: staticPlayers
  };
}
