import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles for PDF
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    pageNumber: {
        fontSize: 14,
        color: '#000',
    },
    logo: {
        width: 30,
        height: 30,
        borderRadius: 15,
        border: '1px solid #000',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Helvetica-Bold',
    },
    subtitle: {
        fontSize: 12,
        marginBottom: 20,
        color: '#333',
        lineHeight: 1.5,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        fontFamily: 'Helvetica-Bold',
        letterSpacing: 0.5,
    },
    articlesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    articleBox: {
        width: '48%',
        padding: 10,
        border: '1px solid #E5E5E5',
        borderRadius: 4,
    },
    articleTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 5,
        fontFamily: 'Helvetica-Bold',
    },
    articleLink: {
        fontSize: 9,
        color: '#666',
    },
    routineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    routineColumn: {
        width: '48%',
    },
    routineHeader: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Helvetica-Bold',
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingVertical: 6,
        paddingHorizontal: 8,
        backgroundColor: '#F9F9F9',
        borderRadius: 4,
    },
    productIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
        backgroundColor: '#E5E5E5',
        borderRadius: 2,
    },
    productText: {
        fontSize: 9,
        color: '#333',
    },
    // Page 2 styles
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Helvetica-Bold',
    },
    infoBox: {
        padding: 15,
        backgroundColor: '#a9ad6f',
        borderRadius: 8,
        marginBottom: 15,
    },
    infoTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: 'Helvetica-Bold',
    },
    infoText: {
        fontSize: 9,
        color: '#666',
        marginBottom: 10,
        lineHeight: 1.4,
    },
    goalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    goalText: {
        fontSize: 10,
        marginLeft: 10,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    statBox: {
        width: '48%',
    },
    statLabel: {
        fontSize: 9,
        color: '#666',
        marginBottom: 3,
    },
    statValue: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Helvetica-Bold',
    },
});

// PDF Document Component
const PDFReport = ({ data }) => {
    return (
        <Document>

            {/* .................................................................................. */}
            {/* Page 2 */}
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.pageNumber}>O1</Text>
                    <View style={styles.logo} />
                </View>

                {/* Greeting */}
                <Text style={styles.greeting}>Hi, {data.userName}!</Text>
                <Text style={styles.subtitle}>
                    Thank you for taking care of Yourself! Here are Your skin Beauty report for {data.month}, Year!
                </Text>

                {/* Satisfaction Level */}
                <View style={styles.infoBox}>
                    <Text style={styles.infoTitle}>
                        Your skin satisfaction level this month / automatically filled in by the app/
                    </Text>
                    <Text style={styles.infoText}>
                        This month you have been consistent with following products:
                    </Text>
                    {data.consistentProducts.map((product, index) => (
                        <View key={index} style={styles.productItem}>
                            <View style={styles.productIcon} />
                            <Text style={styles.productText}>{product}</Text>
                        </View>
                    ))}
                </View>

                {/* New Products */}
                <View style={styles.infoBox}>
                    <Text style={styles.infoTitle}>New products added this month</Text>
                    {data.newProducts.map((product, index) => (
                        <View key={index} style={styles.productItem}>
                            <View style={styles.productIcon} />
                            <Text style={styles.productText}>{product}</Text>
                        </View>
                    ))}
                </View>

                {/* Overview */}
                <Text style={styles.sectionTitle}>OVERVIEW</Text>
                <Text style={styles.subtitle}>
                    Your goal this months was /automatically filled in with the app/
                </Text>
                <Text style={styles.infoText}>
                    Based on your skincare routine consistency and products you use for the coming month you should concentrate more on / automatically filled in by the app: {data.recommendation}
                </Text>

                {/* Goal */}
                <View style={styles.goalContainer}>
                    <Text style={styles.statValue}>{data.goalProgress}%</Text>
                    <View>
                        <Text style={styles.goalText}>My Goal</Text>
                        <Text style={styles.productText}>{data.goal}</Text>
                    </View>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>🔥 Best Streak</Text>
                        <Text style={styles.statValue}>{data.bestStreak} days</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>📅 Total days</Text>
                        <Text style={styles.statValue}>{data.totalDays} days</Text>
                    </View>
                </View>
            </Page>
            {/* ................................................................... */}
            {/* Page 1 */}
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.pageNumber}>O5</Text>
                    <View style={styles.logo} />
                </View>

                {/* Personalized Tip */}
                <Text style={styles.title}>Personalized Tip of the Month</Text>
                <Text style={styles.subtitle}>{data.tipOfMonth}</Text>

                {/* Articles Section */}
                <Text style={styles.sectionTitle}>
                    ARTICLES OR TIPS TAILORED TO TRACKED CONCERNS
                </Text>
                <View style={styles.articlesContainer}>
                    {data.articles.map((article, index) => (
                        <View key={index} style={styles.articleBox}>
                            <Text style={styles.articleTitle}>{article.title}</Text>
                            <Text style={styles.articleLink}>{article.link}</Text>
                        </View>
                    ))}
                </View>

                {/* Routines Section */}
                <Text style={styles.sectionTitle}>DISCOVER NEW ROUTINES</Text>
                <Text style={styles.subtitle}>Seasonal changes</Text>

                <View style={styles.routineContainer}>
                    {/* Morning Routine */}
                    <View style={styles.routineColumn}>
                        <Text style={styles.routineHeader}>☀️ Morning Routine</Text>
                        {data.morningRoutine.map((product, index) => (
                            <View key={index} style={styles.productItem}>
                                <View style={styles.productIcon} />
                                <Text style={styles.productText}>{product}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Evening Routine */}
                    <View style={styles.routineColumn}>
                        <Text style={styles.routineHeader}>🌙 Evening Routine</Text>
                        {data.eveningRoutine.map((product, index) => (
                            <View key={index} style={styles.productItem}>
                                <View style={styles.productIcon} />
                                <Text style={styles.productText}>{product}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PDFReport;