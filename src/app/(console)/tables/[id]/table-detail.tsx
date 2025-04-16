'use client'
import { tableKeys } from "@/api/query-keys/tables";
import { getTableDetail } from "@/api/tables";
import { clientFn } from "@/clientFn";
import { TableDetailResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

interface Props {
    id: number
}
const TableDetail: React.FC<Props> = ({id}) => {
    const {data} = useQuery({
        queryKey: tableKeys.detail(id),
        queryFn: clientFn<any, TableDetailResponse>(getTableDetail, id)
    })
    console.log("table: ", data)
    return (
        <div></div>
    )
}

export default TableDetail;