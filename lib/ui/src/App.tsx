import { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useTable, useSortBy, Column, CellProps } from 'react-table'
import './App.css';
import { Button, defaultTheme, Provider, Radio, RadioGroup } from '@adobe/react-spectrum'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }: { columns: Array<Column<ReactionSticker>>, data: Array<ReactionSticker> }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps((column as any).getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {(column as any).isSorted
                      ? (column as any).isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )
            }
          )}
        </tbody>
      </table>
      <br />
    </>
  )
}

const displayValues: Record<string, string> = {
  '0': 'unassigned',
  '1': 'сделалдело/радость',
  '2': 'боль',
  '3': 'пиздец',
}

export interface ReactionSticker {
  // Can be sent. Not unique
  fileId: string;
  // Cannot be sent. Unique
  fileUniqueId: string;
  collectionId: string;
  setName: string;
}


function App() {
  const [data, setData] = useState<Array<ReactionSticker>>([]);
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(null);
  console.log(fileHandle);
  const updateStickerCollectionId = async (rowIndex: number, collectionId: string) => {
    if (fileHandle === null) {
      console.warn('fileHandle is null')
      return;
    }

    const newData = [...data];
    console.warn('rowIndex', { rowIndex })
    newData[rowIndex].collectionId = collectionId;
    setData(newData);
    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(newData));
    await writable.close();
  }

  const columns = useMemo(
    (): Array<Column<ReactionSticker>> => [
      {
        Header: 'setName',
        accessor: 'setName',
      },
      {
        Header: 'fileUniqueId',
        accessor: 'fileUniqueId',
      },
      {
        Header: 'collectionId',
        accessor: 'collectionId',
        Cell: (props: CellProps<any>) => {
          return <p>{displayValues[props.row.values.collectionId as string]}</p>
        }
      },
      {
        Header: 'collectionId picker',
        Cell: ({ row }: CellProps<any>) => {
          return (
            <RadioGroup
              aria-label="collection picker"
              value={row.values.collectionId}
              onChange={(value) => {
                updateStickerCollectionId(row.index, value)
              }}
            >
              <Radio value="0">{displayValues["0"]}</Radio>
              <Radio value="1">{displayValues["1"]}</Radio>
              <Radio value="2">{displayValues["2"]}</Radio>
              <Radio value="3">{displayValues["3"]}</Radio>
            </RadioGroup>
          )
        }
      },
      {
        Header: 'sticker',
        Cell: (props: CellProps<any>) => {
          return <img width={128} height={128} src={`${props.row.values.fileUniqueId}.webp`} />
        },
      },
    ],
    [
      data,
      fileHandle,
    ]
  )

  const loadDataHandler = () => {
    window.showOpenFilePicker()
      .then(async ([fileHandle]) => {
        console.log(`fileHandle`, { fileHandle })
        setFileHandle(fileHandle);
        const file = await fileHandle.getFile();
        const contents = await file.text();
        setData(JSON.parse(contents));
      })
  }


  return (
    <Styles>
      <Provider theme={defaultTheme}>
        <Button variant="primary" onPress={loadDataHandler} >Load data</Button>
        <Table columns={columns} data={data} />
      </Provider>
    </Styles>
  )
}

export default App
