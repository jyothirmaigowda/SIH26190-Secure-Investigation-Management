/**
 * SIMS Case Management Mock Data
 *
 * This is FICTIONAL demonstration data for frontend UI development.
 * All case numbers, officer names, police stations, and case details are fictional.
 * This data must NOT be used or considered as a template for real investigation records.
 *
 * FUTURE API INTEGRATION:
 * Replace this mock data with calls to:
 *   GET /api/cases
 *   GET /api/cases/:id
 *
 * API contract must be finalized with Member 4 before implementation.
 */

import type { Case, CaseTeamMember } from './types/case'

const mockTeams: Record<string, CaseTeamMember[]> = {
  team1: [
    { id: '1', name: 'Inspector Rajesh Kumar', designation: 'Lead Investigator' },
    { id: '2', name: 'Constable Priya Sharma', designation: 'Field Investigator' },
  ],
  team2: [
    { id: '3', name: 'Inspector Amit Patel', designation: 'Lead Investigator' },
    { id: '4', name: 'Constable Vikram Singh', designation: 'Evidence Handler' },
    { id: '5', name: 'Constable Neha Gupta', designation: 'Field Investigator' },
  ],
  team3: [
    { id: '6', name: 'Inspector Deepa Verma', designation: 'Lead Investigator' },
  ],
  team4: [
    { id: '7', name: 'Inspector Harish Reddy', designation: 'Lead Investigator' },
    { id: '8', name: 'Constable Sunita Rao', designation: 'Document Handler' },
  ],
  team5: [
    { id: '9', name: 'Inspector Ravi Nair', designation: 'Lead Investigator' },
    { id: '10', name: 'Constable Arjun Menon', designation: 'Field Investigator' },
    { id: '11', name: 'Constable Maya Iyer', designation: 'Analyst' },
  ],
}

export const mockCases: Case[] = [
  {
    id: 'case-001',
    caseNumber: 'SIMS-DEMO-1001',
    title: 'Unauthorized Access Investigation',
    caseType: 'Criminal',
    status: 'In Progress',
    priority: 'High',
    policeStation: 'Central Station',
    assignedOfficer: 'Inspector Rajesh Kumar',
    assignedTeam: mockTeams.team1,
    registeredDate: '2024-08-15',
    lastUpdated: '2024-08-29',
    summary:
      'Investigation into unauthorized access to government database. Preliminary findings suggest breach through compromised credentials.',
  },
  {
    id: 'case-002',
    caseNumber: 'SIMS-DEMO-1002',
    title: 'Regulatory Compliance Breach',
    caseType: 'Regulatory',
    status: 'Open',
    priority: 'Medium',
    policeStation: 'Tech Crimes Division',
    assignedOfficer: 'Inspector Amit Patel',
    assignedTeam: mockTeams.team2,
    registeredDate: '2024-08-20',
    lastUpdated: '2024-08-28',
    summary: 'Multiple compliance violations detected during audit. Requires investigation and remediation planning.',
  },
  {
    id: 'case-003',
    caseNumber: 'SIMS-DEMO-1003',
    title: 'Data Theft - Financial Records',
    caseType: 'Criminal',
    status: 'In Progress',
    priority: 'Critical',
    policeStation: 'Financial Crimes Unit',
    assignedOfficer: 'Inspector Deepa Verma',
    assignedTeam: mockTeams.team3,
    registeredDate: '2024-07-22',
    lastUpdated: '2024-08-30',
    summary:
      'Suspected theft of confidential financial records. Multiple suspects identified. Evidence collection in progress.',
  },
  {
    id: 'case-004',
    caseNumber: 'SIMS-DEMO-1004',
    title: 'Administrative Audit - Records Discrepancy',
    caseType: 'Administrative',
    status: 'Under Review',
    priority: 'Low',
    policeStation: 'Central Station',
    assignedOfficer: 'Inspector Harish Reddy',
    assignedTeam: mockTeams.team4,
    registeredDate: '2024-08-25',
    lastUpdated: '2024-08-27',
    summary:
      'Discrepancies found in administrative records during routine audit. Awaiting supervisor review for disposition.',
  },
  {
    id: 'case-005',
    caseNumber: 'SIMS-DEMO-1005',
    title: 'Document Forgery Case',
    caseType: 'Criminal',
    status: 'Closed',
    priority: 'Medium',
    policeStation: 'Central Station',
    assignedOfficer: 'Inspector Ravi Nair',
    assignedTeam: mockTeams.team5,
    registeredDate: '2024-06-10',
    lastUpdated: '2024-08-30',
    summary: 'Investigation into forged legal documents. Case concluded with prosecution recommendation.',
  },
  {
    id: 'case-006',
    caseNumber: 'SIMS-DEMO-1006',
    title: 'Civil Matter - Property Dispute',
    caseType: 'Civil',
    status: 'Open',
    priority: 'Medium',
    policeStation: 'District Court Liaison',
    assignedOfficer: 'Inspector Rajesh Kumar',
    assignedTeam: mockTeams.team1,
    registeredDate: '2024-08-18',
    lastUpdated: '2024-08-26',
    summary: 'Civil property dispute requiring investigation and documentation for court proceedings.',
  },
  {
    id: 'case-007',
    caseNumber: 'SIMS-DEMO-1007',
    title: 'Fraud Investigation - Online Transaction',
    caseType: 'Fraud',
    status: 'In Progress',
    priority: 'High',
    policeStation: 'Cyber Fraud Division',
    assignedOfficer: 'Inspector Amit Patel',
    assignedTeam: mockTeams.team2,
    registeredDate: '2024-08-22',
    lastUpdated: '2024-08-29',
    summary: 'Investigation into fraudulent online transaction. Bank cooperation secured. Suspect identified.',
  },
  {
    id: 'case-008',
    caseNumber: 'SIMS-DEMO-1008',
    title: 'Record Verification - Background Check',
    caseType: 'Administrative',
    status: 'Closed',
    priority: 'Low',
    policeStation: 'Central Station',
    assignedOfficer: 'Inspector Deepa Verma',
    assignedTeam: mockTeams.team3,
    registeredDate: '2024-07-30',
    lastUpdated: '2024-08-20',
    summary: 'Routine background verification for employment clearance. Verification completed successfully.',
  },
  {
    id: 'case-009',
    caseNumber: 'SIMS-DEMO-1009',
    title: 'Evidence Chain Custody Review',
    caseType: 'Criminal',
    status: 'Under Review',
    priority: 'High',
    policeStation: 'Evidence Management Unit',
    assignedOfficer: 'Inspector Harish Reddy',
    assignedTeam: mockTeams.team4,
    registeredDate: '2024-08-12',
    lastUpdated: '2024-08-28',
    summary: 'Chain of custody review for criminal case evidence. Audit in progress to ensure compliance.',
  },
  {
    id: 'case-010',
    caseNumber: 'SIMS-DEMO-1010',
    title: 'Personnel Records Investigation',
    caseType: 'Administrative',
    status: 'Suspended',
    priority: 'Low',
    policeStation: 'Human Resources',
    assignedOfficer: 'Inspector Ravi Nair',
    assignedTeam: mockTeams.team5,
    registeredDate: '2024-07-05',
    lastUpdated: '2024-08-15',
    summary:
      'Investigation into personnel records discrepancy. Currently on hold pending additional documentation from HR.',
  },
  {
    id: 'case-011',
    caseNumber: 'SIMS-DEMO-1011',
    title: 'Compliance Audit - Annual Review',
    caseType: 'Regulatory',
    status: 'Open',
    priority: 'High',
    policeStation: 'Compliance Division',
    assignedOfficer: 'Inspector Rajesh Kumar',
    assignedTeam: mockTeams.team1,
    registeredDate: '2024-08-01',
    lastUpdated: '2024-08-29',
    summary:
      'Annual compliance audit for regulatory requirements. Multiple departments involved. Documentation collection ongoing.',
  },
  {
    id: 'case-012',
    caseNumber: 'SIMS-DEMO-1012',
    title: 'Incident Report - Data Breach Attempt',
    caseType: 'Criminal',
    status: 'Open',
    priority: 'Critical',
    policeStation: 'Cyber Security Unit',
    assignedOfficer: 'Inspector Deepa Verma',
    assignedTeam: mockTeams.team3,
    registeredDate: '2024-08-30',
    lastUpdated: '2024-08-30',
    summary: 'Recently reported attempted data breach on production systems. Incident response team activated. Investigation initiated.',
  },
]
