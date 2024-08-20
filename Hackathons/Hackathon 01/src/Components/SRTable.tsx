import { Tooltip } from '@mui/material';
import Table from 'react-bootstrap/Table';

function SRTable(props: any) {
    const { data, cols } = props
    return (
        <Table striped bordered hover responsive variant="dark">
            <thead>
                <tr>
                    {cols.map((item: any, index: any) => (
                        <>
                            <th className='fw-semibold' key={index}>{item.value}</th>
                        </>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((dataItem: any, rowIndex: any) => (
                        <tr key={rowIndex}>
                            {cols.map((col: any, colIndex: any) => {
                                const value = dataItem[col.id];
                                return (
                                    <td width={col.width && col.width} key={colIndex}>
                                        {col.render ? col.render(dataItem) : (
                                            value.length > 19 ? (
                                                <Tooltip title={value} placement="top" arrow>
                                                    <span>{value.slice(0, 19)}...</span>
                                                </Tooltip>
                                            ) : (
                                                <span>{value}</span>
                                            )
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={cols.length}>No data available</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default SRTable;