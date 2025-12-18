import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: "3 solid #14b8a6",
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f766e",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 5,
  },
  dateText: {
    fontSize: 10,
    color: "#94a3b8",
    textAlign: "center",
  },
  sectionContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#f0fdfa",
    borderRadius: 8,
    borderLeft: "4 solid #14b8a6",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 8,
    borderBottom: "1 solid #99f6e4",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f766e",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "center",
  },
  label: {
    width: 120,
    fontSize: 10,
    color: "#0d9488",
    fontWeight: "bold",
  },
  value: {
    flex: 1,
    fontSize: 10,
    color: "#334155",
  },
  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    paddingBottom: 4,
    borderBottom: "1 dashed #cbd5e1",
  },
  stepLabel: {
    fontSize: 10,
    color: "#334155",
  },
  statusBadge: {
    fontSize: 9,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontWeight: "bold",
  },
  complianceBox: {
    marginTop: 10,
    paddingTop: 10,
    borderTop: "1 solid #99f6e4",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  complianceLabel: {
    fontSize: 12,
    color: "#0f766e",
    marginRight: 10,
  },
  complianceValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#14b8a6",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#94a3b8",
    borderTop: "1 solid #e2e8f0",
    paddingTop: 10,
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    right: 40,
    fontSize: 8,
    color: "#94a3b8",
  },
});

export default function AuditPDF({ data, complianceRate }) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getStatusColor = (status) => {
    return status ? "#059669" : "#dc2626";
  };

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header} fixed>
          <Text style={styles.title}>Electronic Audit Report</Text>
          <Text style={styles.subtitle}>
            Infection Control Compliance Record
          </Text>
          <Text style={styles.dateText}>Generated on {currentDate}</Text>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Audit Details</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Department:</Text>
            <Text style={styles.value}>{data.department || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Auditor Name:</Text>
            <Text style={styles.value}>{data.auditorName || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Staff Member:</Text>
            <Text style={styles.value}>{data.staffMember || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hand Hygiene Steps</Text>
          </View>

          {Object.entries(data.handHygieneSteps).map(([key, value]) => (
            <View key={key} style={styles.stepRow}>
              <Text style={styles.stepLabel}>{key}</Text>
              <Text
                style={[styles.statusBadge, { color: getStatusColor(value) }]}
              >
                {value ? "PASS" : "FAIL"}
              </Text>
            </View>
          ))}

          <View style={styles.complianceBox}>
            <Text style={styles.complianceLabel}>Total Compliance Rate:</Text>
            <Text style={styles.complianceValue}>{complianceRate}%</Text>
          </View>
        </View>

        <View style={styles.sectionContainer} wrap={false}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Additional Details</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>PPE Used:</Text>
            <Text style={styles.value}>
              {data.ppeUsed && data.ppeUsed.length > 0
                ? data.ppeUsed.join(", ")
                : "None Recorded"}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Observations:</Text>
            <Text style={styles.value}>
              {data.observations || "No specific observations noted."}
            </Text>
          </View>
        </View>

        <Text style={styles.footer} fixed>
          This document serves as an official record of infection control
          compliance. Confidential.
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
