import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#fff',
  },
  header: {
    borderBottom: '1 solid #ccc',
    paddingBottom: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  companyInfo: {
    flexDirection: 'column',
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  label: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D4ED8',
  },
  footer: {
    borderTop: '1 solid #ccc',
    paddingTop: 10,
    fontSize: 8,
    color: '#666',
  },
  paidStamp: {
    position: 'absolute',
    bottom: 60,
    right: 30,
    textAlign: 'center',
    border: '2 solid green',
    color: 'green',
    padding: 5,
    transform: 'rotate(-20deg)',
    width: 100,
    fontSize: 10,
  },
});
    
// PDF Component
const SalarySlipPDF = ({ emp, record }) => (
    
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <Text style={styles.title}>AriPen Pvt. Ltd.</Text>
          <Text>123, Tech Park, Surat, Gujarat</Text>
          <Text>Email: hr@yourcompany.com | Phone: +91-1234567890</Text>
          <Text>GSTIN: 24ABCDE1234F1Z5</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Salary Slip</Text>
          <Text>Month: {record.month}</Text>
        </View>
      </View>

      {/* Employee Info */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text><Text style={styles.label}>Salary ID:</Text> {record.salaryId}</Text>
          <Text><Text style={styles.label}>Employee ID:</Text> {record.employeeId}</Text>
        </View>
        <View style={styles.row}>
          <Text><Text style={styles.label}>Employee Name:</Text> {emp.name}</Text>
          <Text><Text style={styles.label}>Designation:</Text> {emp.designation}</Text>
        </View>
        <View style={styles.row}>
          <Text><Text style={styles.label}>Department:</Text> {emp.department}</Text>
          <Text><Text style={styles.label}>Payment Date:</Text> {record.paymentDate}</Text>
        </View>
      </View>

      {/* Salary Breakdown */}
      <View style={[styles.section, { borderTop: '1 solid #ccc', borderBottom: '1 solid #ccc', paddingVertical: 10 }]}>
        <View style={styles.row}>
          <Text style={styles.label}>Earnings</Text>
          <Text style={styles.label}>Deductions</Text>
        </View>
        <View style={styles.row}>
          <Text>Basic Salary: ₹ {record.basicSalary.toLocaleString()}</Text>
          <Text>Standard Deduction: ₹ {record.deduction.toLocaleString()}</Text>
        </View>
        <View style={styles.row}>
          <Text>Allowance: ₹ {record.allowance.toLocaleString()}</Text>
        </View>
      </View>

      {/* Net Salary */}
      <View style={styles.section}>
        <Text style={[styles.label, { fontSize: 12 }]}>
          Net Salary (in ₹): ₹ {record.netSalary.toLocaleString()}
        </Text>
      </View>

      {/* Footer Note */}
      <View style={styles.footer}>
        <Text>Note: This is a computer-generated salary slip and does not require any signature.</Text>
      </View>

      {/* Paid Stamp */}
      <View style={styles.paidStamp}>
        <Text style={{ fontSize: 14 }}>PAID</Text>
        <Text>AriPen Pvt. Ltd.</Text>
        <Text>{record.paymentDate}</Text>
      </View>

    </Page>
  </Document>
);

export default SalarySlipPDF;
