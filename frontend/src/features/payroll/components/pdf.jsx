import React from 'react';
import { PDFDownloadLink,Image, Document, Page, Text, PDFViewer,StyleSheet, View  } from '@react-pdf/renderer';
import BlackButton from '../ui/button';
import { Box } from '@mui/material';
import {  makeStyles } from '@material-ui/core';
import { format } from 'date-fns';


const styles = StyleSheet.create({
	page: {
        padding:20
	},
	logo: {
		width: '20%',
	},
    head:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:'10%',
    },
    addBorder:{
        marginTop:'16px',
        borderBottom:'1px solid black'
    },
	centerImage: {
		alignItems: 'center',
		flexGrow: 1,
	},
    information:{
        marginTop:'20px',
    },
    table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginTop:'10px',
        padding:'10px'
      },
      tableRow: {
        margin: 'auto',
        flexDirection: 'row',
        display:'flex',
        flexDirection:'row',
        width:'80%',
        justifyContent:'space-between'
      },
      tableCell: {
        margin: 'auto',
        marginTop: 5,
        marginBottom: 5,
        // borderBottomColor: '#000',
        // borderRightColor: '#000',
        // borderWidth: 1,
        // borderStyle: 'solid',
      },
      tableHeader: {
        // backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
      },
});

const SalaryPDF = ({ data }) => {

  return (
    <div>
        {/* <PDFViewer>
        </PDFViewer> */}
      <PDFDownloadLink document={<SalaryDocument data={data}/>} fileName="salary.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Generating PDF...' : <>
            <Box component='div'>
                <BlackButton label='download'/>
            </Box>
          </>
        }
      </PDFDownloadLink>
    </div>
  );
};

const SalaryDocument = ({ data }) => {
    const totalAllowance=data?.allowances.reduce((data,value)=> parseFloat(data.allowance)+parseFloat(value.allowance))
    const totalDeduction=data?.allowances.reduce((data,value)=>parseFloat(data.deduction)+parseFloat(value.deduction));
    const totalSalary=(totalAllowance+parseFloat(data?.salary))-totalDeduction
    // const formattedDate = ;

    const dateCreated=(createdAt)=>{
        const date=new Date(createdAt);
        return format(date, 'dd MMMM yyyy')
    }
  return (
    <Document >
      <Page style={styles.page}>
        <View style={styles.head}>
          <Image style={styles.logo} src={'/logo.png'}/>
          <Text>{dateCreated(data?.createdAt)}</Text>
        </View>
        <View style={styles.addBorder}></View>
        <View style={styles.information}>
            <Text>Employee Salary Details:</Text>
            <Text>Name: {data.name}</Text>
        </View>
        <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.tableHeader]}>
                <Text>Sr</Text>
              </View>

               <View style={[styles.tableCell, styles.tableHeader]}>
                <Text>Allowances</Text>
              </View>
              <View style={[styles.tableCell, styles.tableHeader]}>
                <Text>Deducation</Text>
              </View>
              <View style={[styles.tableCell, styles.tableHeader]}>
                <Text>Salary</Text>
              </View>
              <View style={[styles.tableCell, styles.tableHeader]}>
                <Text>Total Salary</Text>
              </View>
              {/*
              <View style={[styles.tableCell, styles.tableHeader]}>
                <Text>Deducation</Text>
              </View> */}
            </View>
            <TableBody salary={data?.salary} allowances={data?.allowances}/>

            <View style={styles.addBorder}></View>
            <View >
                <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableHeader]}>
                    <Text></Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                    <Text>{totalAllowance}</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                    <Text>{totalDeduction}</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                    <Text>{data?.salary}</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                    <Text>{totalSalary}</Text>
                </View>
                </View>
            </View>
        </View>


        {/* Add more salary details as needed */}
      </Page>
    </Document>
  );
};

const TableBody = ({ salary,allowances=[] }) => {
    allowances[0].salary=salary
 

    const genrateSpace=(salary)=>{
        const salaryString=salary.toString();
        console.log(typeof salaryString)
        const salaryLength=salaryString?.length;
        console.log(salaryLength)
        return Array(salaryLength).fill(0).map((data)=>{
            return data;
        });
    }
    return (
      <View style={styles.tableBody}>
            {allowances?.map((item, index) => (

            <View style={styles.tableRow} >
                <View style={styles.tableCell}>
                  <Text>{index+1}</Text>
                </View>
                <View style={styles.tableCell}>
                    <Text>{item.allowance}</Text>
                </View>
                <View style={styles.tableCell}>
                   <Text>{item?.deduction}</Text>
                </View>
                {index===0 ?
                <View style={styles.tableCell}>
                    <Text>{salary}</Text>
                </View>
                :
                <View style={styles.tableCell}>
                   <Text>{genrateSpace(salary)}</Text>
                </View>
                }

                <View style={styles.tableCell}>
                    <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                </View>

            </View>

             ))}
      </View>
    );
  };

export default SalaryPDF;
