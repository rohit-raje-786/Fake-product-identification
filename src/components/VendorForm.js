import React from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import { useForm, useField, splitFormProps } from "react-form";
import { useTable } from "react-table";
import QRCode from "qrcode.react";
import Modal from "react-modal";
import "./VendorForm.css";

const TableInput = (props) => {
  console.log("TableInput", props);
  const { column, row, cell, updateData } = props;
  const onChange = (e) => updateData(row.index, column.id, e.target.value);
  return <input type="number" value={cell.value} onChange={onChange} />;
};

const ItemName = (props) => {
  console.log("ItemName", props);
  const { column, row, cell, updateData } = props;
  const onChange = (e) => updateData(row.index, column.id, e.target.value);
  return <input type="text" value={cell.value} onChange={onChange} />;
};

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    width: 25%;
    text-align: center;
    border: 1px solid lightgray;
    padding: 5px;
  }
`;
const ReactTable = React.memo((props) => {
  console.log("ReactTable", props);
  const { setAmountDue } = props;
  const columns = React.useMemo(
    () => [
      {
        Header: "Item",
        accessor: "item",
        Cell: ItemName,
      },
      {
        Header: "Item Description",
        accessor: "description",
        Cell: ItemName,
      },
      {
        Header: "Cost (INR)",
        accessor: "cost",
        Cell: TableInput,
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        Cell: TableInput,
      },
      {
        Header: "Total (INR)",
        accessor: (row) => row.cost * row.quantity,
        id: "total",
      },
    ],
    []
  );
  const initialData = [
    {
      item: "Vaccine",
      description: "Medicine",
      cost: 1,
      quantity: 2,
    },
    {
      item: "Dolo",
      description: "Medicine",
      cost: 3,
      quantity: 4,
    },
  ];
  const [data, setData] = React.useState(initialData);
  const resetData = () => setData(initialData);
  const addRow = () =>
    setData((old) => [
      ...old,
      { item: "Vaccine", description: "Medicine", cost: "5", quantity: "6" },
    ]);
  const updateData = (rowIndex, columnID, value) => {
    setData((oldData) =>
      oldData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...oldData[rowIndex],
            [columnID]: value,
          };
        }
        return row;
      })
    );
  };
  const table = useTable({ columns, data, updateData });
  const { getTableProps, headerGroups, rows, prepareRow } = table;
  const tableSum = rows.reduce((sum, row) => sum + row.values.total, 0);
  console.log("setAmountDue", tableSum);
  setAmountDue(tableSum);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [qrcode, setQrcode] = React.useState(null);
  const [hash, setHash] = React.useState(null);
  const [assetId, setAssetId] = React.useState(null);
  const [assetModalIsOpen, setAssetModalIsOpen] = React.useState(false);
  const [assetDetails, setAssetDetails] = React.useState([]);

  const closeModal = () => {
    setQrcode(null);
    setIsOpen(false);
  };

  const assetcloseModal = () => {
    setAssetModalIsOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      height: "580px",
      borderRadius: "20px",
      backgroundClip: "text",
    },
  };
  const assetModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      height: "400px",
      borderRadius: "20px",
      backgroundClip: "text",
    },
  };

  const getAsset = async (e) => {
    e.preventDefault();
    if (!assetId) {
      console.log("Please Enter Asset Id");
      return;
    }
    let asset = await props.contract.getAssetByUUID(assetId);
    let assetcostandquantity = await props.contract.getItemByUUID(assetId);
    console.log(asset);

    console.log(assetcostandquantity[0].toString());
    console.log(assetcostandquantity[1].toString());
    let arr = [];

    asset.map((a) => arr.push(a));
    assetcostandquantity.map((a) => arr.push(a.toString()));
    console.log(arr);

    setAssetDetails(arr);

    setAssetModalIsOpen(true);
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="QrCode Modal"
        ariaHideApp={false}
      >
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <PaymentQRCode size={500} value={`${qrcode}&hash=${hash}`} />
        </div>

        <span onClick={closeModal} className="close-btn">
          <i className="fal fa-times-circle"></i>
        </span>
      </Modal>
      <Modal
        isOpen={assetModalIsOpen}
        onRequestClose={assetcloseModal}
        style={assetModalStyles}
        contentLabel="Asset Modal"
        ariaHideApp={false}
      >
        <div style={{ textAlign: "center", marginTop: 10, color: "black" }}>
          <h2>Name:{assetDetails[0]}</h2>
          <h2>Description:{assetDetails[1]}</h2>
          <h2>Quantity:{assetDetails[8]}</h2>
          <h2>Cost:{assetDetails[7]}</h2>
          <h2>Manufacturer:{assetDetails[2]}</h2>
          <h2>Consumer:{assetDetails[3]}</h2>
          <h2>AddressFrom:{assetDetails[4]}</h2>
          <h2>AddressTo:{assetDetails[5]}</h2>
        </div>

        <span onClick={assetcloseModal} className="close-btn">
          <i className="fal fa-times-circle"></i>
        </span>
      </Modal>
      <label>Itemized Costs:</label>
      <br />
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
          <tr>
            <td colSpan={3}>
              <button type="button" onClick={addRow}>
                Add Row
              </button>
              <button type="button" onClick={resetData}>
                Reset Table
              </button>
            </td>
            <br />
            <button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                console.log(
                  data[0].item,
                  data[0].description,
                  data[0].cost,
                  data[0].quantity,
                  props.vendorName,
                  props.consumerName,
                  props.vendorAdd,
                  props.consumerAdd
                );

                let asset = await props.contract.createAsset(
                  data[0].item,
                  data[0].description,
                  "2",
                  data[0].cost,
                  data[0].quantity,
                  props.vendorName,
                  props.consumerName,
                  props.vendorAdd,
                  props.consumerAdd
                );
                await asset.wait();
                console.log("asset created", asset.hash);
                setHash(asset.hash);
                if (asset.hash) {
                  const info = {
                    name: data[0].item,
                    description: data[0].description,
                    id: "1",
                    cost: data[0].cost,
                    quantity: data[0].quantity,
                    vendorName: props.vendorName,
                    consumerName: props.consumerName,
                    vendorAdd: props.vendorAdd,
                    consumerAdd: props.consumerAdd,
                  };
                  let strData = JSON.stringify(info);
                  setQrcode(strData);
                  setIsOpen(true);
                } else {
                  console.log("unable to create asset");
                }
              }}
              style={{ width: 190, height: 40, cursor: "pointer" }}
            >
              Create Asset
            </button>
            <div className="getAssetById">
              <input
                type="number"
                placeholder="assetId"
                style={{ width: 190, height: 34, marginTop: 6, marginLeft: 5 }}
                onChange={(e) => {
                  e.preventDefault();
                  setAssetId(e.target.value);
                }}
              />
              <button
                style={{ width: 190, height: 40, cursor: "pointer" }}
                onClick={getAsset}
              >
                Get Asset
              </button>
            </div>
          </tr>
        </tbody>
      </StyledTable>
    </>
  );
});

const StyledInput = styled.input`
  flex: 1 1 auto;
  margin: 5px;
  padding: 5px;
`;

const FormStyles = styled.div`
  form {
    margin: 10px;
    label {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    aside {
      display: flex;
      justify-content: space-between;
    }
    section {
      flex: 1 1 auto;
      display: flex;
      flex-flow: column nowrap;
    }
    button {
      margin: 5px;
      padding: 5px;
      width: 100px;
      align-self: flex-end;
    }
  }
`;
const AmountDue = styled.label`
  margin: 10px;
  font-size: 1.5em;
  align-self: flex-end;
`;
const PaymentQRCode = styled(QRCode)`
  padding: 5px;
  align-self: flex-end;
`;
const Notes = styled(StyledInput)`
  min-height: 50px;
`;
const ReactForm = (props) => {
  console.log("ReactForm", props);
  const { amountDue, setAmountDue, account } = props;
  const defaultValues = React.useMemo(
    () => ({
      name: "Rohit",
      dashAddress: "Kalyan",
      dashAddressto: "Gujrat",
      notes: "Payment terms: Net 30",
    }),
    []
  );
  const onSubmit = async (values, instance) => {
    console.log("Form values:", values);
    instance.reset();
  };
  const form = useForm({ defaultValues, onSubmit });
  const { Form, values, meta } = form;
  const { isSubmitting, canSubmit } = meta;
  const required = React.useCallback(
    (value) => (!value ? "Required!" : false),
    []
  );
  const [vendorName, setVendorName] = React.useState("");
  const [vendorAdd, setVendorAdd] = React.useState("");
  const [consumerAdd, setConsumerAdd] = React.useState("");
  const [consumerName, setConsumerName] = React.useState("");
  return (
    <FormStyles>
      <Form>
        <aside>
          <section>
            <label>
              Vendor Name:{" "}
              <input
                type="text"
                className="VendorInfo"
                onChange={(e) => {
                  e.preventDefault();
                  setVendorName(e.target.value);
                }}
              />
            </label>
            <label>
              Consumer Name:{" "}
              <input
                type="text"
                className="VendorInfo"
                onChange={(e) => {
                  e.preventDefault();
                  setConsumerName(e.target.value);
                }}
              />
            </label>
            <label>
              Address From:
              <input
                type="text"
                className="VendorInfo"
                onChange={(e) => {
                  e.preventDefault();
                  setVendorAdd(e.target.value);
                }}
              />
            </label>
            <label>
              Address To:
              <input
                type="text"
                className="VendorInfo"
                onChange={(e) => {
                  e.preventDefault();
                  setConsumerAdd(e.target.value);
                }}
              />
            </label>
          </section>
          <section>
            <AmountDue>Amount Due: {amountDue} INR</AmountDue>
            {/* <PaymentQRCode
              size={300}
              value={`dash:${
                values.dashAddress + values.dashAddressto
              }?amount=${amountDue}?address=${account}`}
            /> */}
          </section>
        </aside>
        <ReactTable
          setAmountDue={setAmountDue}
          contract={props.contract}
          vendorName={vendorName}
          consumerName={consumerName}
          vendorAdd={vendorAdd}
          consumerAdd={consumerAdd}
        />
        <br />
        <aside>
          <section>
            {isSubmitting ? "Submitting..." : null}
            <button type="submit" disabled={!canSubmit}>
              Reset Form
            </button>
          </section>
        </aside>
      </Form>
    </FormStyles>
  );
};

const Main = styled.main`
  border-radius: 5px;
  padding: 10px;
  background: white;
  h2 {
    text-align: center;
  }
`;
const Invoice = (props) => {
  console.log("Invoice", props);
  const [amountDue, setAmountDue] = React.useState(0);

  return (
    <Main>
      <h2>Invoice</h2>
      <ReactForm
        amountDue={amountDue}
        setAmountDue={setAmountDue}
        account={props.account}
        contract={props.contract}
      />
    </Main>
  );
};

const GlobalStyles = createGlobalStyle`
  body {
    font: 1em sans-serif;
    margin: 15px;
    background: lightgray;
  }
`;

const App = (props) =>
  console.log("contract", props.contract) || (
    <>
      <GlobalStyles />
      <Invoice account={props.account} contract={props.contract} />
    </>
  );

export default App;
