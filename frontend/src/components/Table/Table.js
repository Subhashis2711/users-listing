import React, { useContext, useEffect, useState } from "react";
import configObject from "../../config";

import useTable from "../../hooks/useTable";
import UsersContext from "../../store/users-context";
import classes from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, searched }) => {
    const usersCtx = useContext(UsersContext);

    const [page, setPage] = useState(1);
    const rowsPerPage = configObject.ROWS_PER_PAGE;
    const { slice, range } = useTable(data, page, rowsPerPage);

    const [slicedData, setSlicedData ] = useState([]);

    useEffect(() => {
        if (slice.length) {
            usersCtx.updateCurrentUsers(slice);
            setSlicedData(slice);
        }

        if (searched.length) {
            setSlicedData(searched);
        }
    }, [slice, searched, usersCtx]);

    return (
        <>
            <table className={classes.table}>
                <thead className={classes.tableRowHeader}>
                    <tr>
                        <th className={classes.tableHeader}>Firstname</th>
                        <th className={classes.tableHeader}>Lastname</th>
                        <th className={classes.tableHeader}>City</th>
                        <th className={classes.tableHeader}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {slicedData.map((el) => (
                        <tr className={classes.tableRowItems} key={el._id}>
                            <td className={classes.tableCell}>
                                {el.firstname}
                            </td>
                            <td className={classes.tableCell}>{el.lastname}</td>
                            <td className={classes.tableCell}>{el.city}</td>
                            <td className={classes.tableCell}>{el.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {usersCtx.search === false && (
                <TableFooter
                    range={range}
                    slice={slice}
                    setPage={setPage}
                    page={page}
                />
            )}
        </>
    );
};

export default Table;
