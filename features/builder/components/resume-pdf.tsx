import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import type { Resume } from "../types/resume";
import { toDisplayBullets } from "../lib/bullets";

interface ResumePDFProps {
  resume: Resume;
  template: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#111827",
  },

  header: {
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },

  contact: {
    fontSize: 9,
    color: "#6b7280",
  },

  section: {
    marginTop: 14,
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 6,
    textTransform: "uppercase",
  },

  experience: {
    marginBottom: 10,
  },

  role: {
    fontSize: 10,
    fontWeight: "bold",
  },

  company: {
    fontSize: 9,
    color: "#4b5563",
    marginTop: 2,
  },

  date: {
    fontSize: 9,
    color: "#6b7280",
    marginTop: 2,
  },

  description: {
    fontSize: 9,
    lineHeight: 1.5,
    marginTop: 4,
  },
    bulletRow: {
    flexDirection: "row",
    marginTop: 3,
  },

  bulletMark: {
    width: 10,
    fontSize: 9,
  },

  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.5,
  },

  skills: {
    fontSize: 9,
    lineHeight: 1.5,
  },
});

export function ResumePDF({
  resume,
  template,
}: ResumePDFProps) {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    projects,
  } = resume;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={[
            styles.header,
            template === "modern"
              ? {
                  borderLeftWidth: 4,
                  borderLeftColor: "#111827",
                  paddingLeft: 10,
                }
              : {},
          ]}
        >
          <Text style={styles.name}>
            {personalInfo.fullName || "Your Name"}
          </Text>

          <Text style={styles.contact}>
            {[
              personalInfo.email,
              personalInfo.phone,
              personalInfo.location,
            ]
              .filter(Boolean)
              .join(" • ")}
          </Text>
        </View>

        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Summary
            </Text>

            <Text style={styles.description}>
              {summary}
            </Text>
          </View>
        )}

        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Experience
            </Text>

            {experience.map((item) => (
              <View
                key={item.id}
                style={styles.experience}
              >
                <Text style={styles.role}>
                  {item.role}
                </Text>

                <Text style={styles.company}>
                  {item.company}
                  {item.location
                    ? ` • ${item.location}`
                    : ""}
                </Text>

                <Text style={styles.date}>
                  {item.startDate} –{" "}
                  {item.current
                    ? "Present"
                    : item.endDate}
                </Text>

                {toDisplayBullets(item.description).map((bullet, i) => (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bulletMark}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Education
            </Text>

            {education.map((item) => (
              <View
                key={item.id}
                style={styles.experience}
              >
                <Text style={styles.role}>
                  {item.degree}
                  {item.field
                    ? `, ${item.field}`
                    : ""}
                </Text>

                <Text style={styles.company}>
                  {item.institution}
                </Text>

                <Text style={styles.date}>
                  {item.startDate} – {item.endDate}
                </Text>
              </View>
            ))}
          </View>
        )}

        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Skills
            </Text>

            <Text style={styles.skills}>
              {skills.join(" • ")}
            </Text>
          </View>
        )}

        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Projects
            </Text>

            {projects.map((project) => (
              <View
                key={project.id}
                style={styles.experience}
              >
                <Text style={styles.role}>
                  {project.name}
                </Text>

                {project.description && (
                  <Text style={styles.description}>
                    {project.description}
                  </Text>
                )}

                {project.technologies.length > 0 && (
                  <Text style={styles.company}>
                    {project.technologies.join(" • ")}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}