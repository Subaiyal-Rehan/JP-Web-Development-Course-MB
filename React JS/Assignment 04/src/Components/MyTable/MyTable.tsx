function MyTable(props: any) {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr className="fs-4">
          <th>#</th>
          <th>Date</th>
          <th>Time</th>
          <th>Agenda</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(props.row).length !== 0 ? (
          props.row
        ) : (
          <tr className="fs-5">
            <td>1</td>
            <td>17-01-2024</td>
            <td>10:00 AM</td>
            <td>Project Status Update</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default MyTable;
