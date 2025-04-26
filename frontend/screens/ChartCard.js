import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  StatusBar,
  useColorScheme,
  RefreshControl,
  Platform
} from 'react-native';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Memoized StatsCard component to prevent unnecessary re-renders
const StatsCard = memo(({ title, value, icon, color, trend = null }) => {
  const isTrendPositive = trend > 0;
  const trendColor = isTrendPositive ? '#22C55E' : '#EF4444';
  const trendIcon = isTrendPositive ? 'trending-up' : 'trending-down';
  
  return (
    <View style={[styles.statsCard, { borderLeftColor: color }]} accessible={true} accessibilityLabel={`${title}: ${value}${trend ? `, ${Math.abs(trend)}% ${isTrendPositive ? 'increase' : 'decrease'}` : ''}`}>
      <View style={styles.statsHeader}>
        <MaterialIcons name={icon} size={24} color={color} />
        {trend !== null && (
          <View style={styles.trendContainer}>
            <MaterialIcons 
              name={trendIcon} 
              size={16} 
              color={trendColor} 
            />
            <Text style={[styles.trendText, { color: trendColor }]}>
              {Math.abs(trend)}%
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.statsValue}>{value}</Text>
      <Text style={styles.statsTitle}>{title}</Text>
    </View>
  );
});

// Memoized TabButton component
const TabButton = memo(({ title, isActive, onPress }) => (
  <TouchableOpacity 
    style={[styles.tabButton, isActive && styles.activeTabButton]}
    onPress={onPress}
    accessibilityRole="tab"
    accessibilityState={{ selected: isActive }}
  >
    <Text style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}>
      {title}
    </Text>
  </TouchableOpacity>
));

export default function BloodDonationDashboard() {
  const [activeTab, setActiveTab] = useState('donations');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [chartDimensions, setChartDimensions] = useState({ width: SCREEN_WIDTH - 40, height: 220 });
  const [isLandscape, setIsLandscape] = useState(SCREEN_WIDTH > SCREEN_HEIGHT);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const insets = useSafeAreaInsets();
  
  // Calculate adaptive chart dimensions based on screen orientation
  useEffect(() => {
    const updateChartDimensions = ({ window }) => {
      const { width: newWidth, height: newHeight } = window;
      const isLandscapeOrientation = newWidth > newHeight;
      setIsLandscape(isLandscapeOrientation);
      
      // Calculate optimal chart width and height for current orientation
      const chartWidth = isLandscapeOrientation 
        ? Math.min(newWidth * 0.7, 700) // limit max width in landscape
        : newWidth - 40;
        
      const chartHeight = isLandscapeOrientation 
        ? Math.min(newHeight * 0.5, 300)
        : 250; // taller charts on portrait
        
      setChartDimensions({ width: chartWidth, height: chartHeight });
    };
    
    // Update dimensions on mount
    updateChartDimensions({ window: Dimensions.get('window') });
    
    // Subscribe to dimension changes
    const subscription = Dimensions.addEventListener('change', updateChartDimensions);
    
    return () => subscription?.remove();
  }, []);

  // Simulate data refresh with more realistic behavior
  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    
    // Simulate network request with random timing
    setTimeout(() => {
      setIsLoading(false);
    }, 800 + Math.random() * 800); // Between 800-1600ms
  }, []);

  // Pull-to-refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Cache tab selection with useCallback
  const selectTab = useCallback((tab) => {
    // Add slight delay to simulate tab transition
    setIsLoading(true);
    setActiveTab(tab);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  // Mock stats data - defined once, used everywhere
  const statsData = [
    { id: 1, title: 'Total Donations', value: '2,547', icon: 'water-drop', color: '#870D25', trend: 12 },
    { id: 2, title: 'Accepted Requests', value: '382', icon: 'check-circle', color: '#22C55E', trend: 8 },
    { id: 3, title: 'Pending Requests', value: '107', icon: 'pending', color: '#F59E0B', trend: -3 },
    { id: 4, title: 'Total Requests', value: '489', icon: 'dashboard', color: '#3B82F6', trend: 5 },
  ];

  // Enhanced chart data with more realistic information and smooth gradients
  const monthlyDonations = useMemo(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ 
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(135, 13, 37, ${opacity})`, // Custom color for line
      strokeWidth: 2 // optional
    }]
  }), []);
  
  const bloodTypes = useMemo(() => [
    { name: 'A+', population: 35, color: '#BF2649', legendFontColor: isDarkMode ? '#E0E0E0' : '#444', legendFontSize: 12 },
    { name: 'B+', population: 25, color: '#D2042D', legendFontColor: isDarkMode ? '#E0E0E0' : '#444', legendFontSize: 12 },
    { name: 'O+', population: 20, color: '#E63946', legendFontColor: isDarkMode ? '#E0E0E0' : '#444', legendFontSize: 12 },
    { name: 'AB+', population: 10, color: '#F94144', legendFontColor: isDarkMode ? '#E0E0E0' : '#444', legendFontSize: 12 },
    { name: 'A-', population: 5, color: '#9D0208', legendFontColor: isDarkMode ? '#E0E0E0' : '#444', legendFontSize: 12 },
    { name: 'O-', population: 5, color: '#6A040F', legendFontColor: isDarkMode ? '#E0E0E0' : '#444', legendFontSize: 12 }
  ], [isDarkMode]);
  
  const userGrowth = useMemo(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ 
      data: [50, 60, 70, 80, 90, 110],
      color: (opacity = 1) => `rgba(135, 13, 37, ${opacity})`, // Custom color for line
      strokeWidth: 2.5 // Slightly thicker line
    }]
  }), []);

  // Enhanced chart configuration with improved visuals for mobile
  const chartConfig = useMemo(() => ({
    backgroundGradientFrom: isDarkMode ? "#1E1E1E" : "#fff",
    backgroundGradientTo: isDarkMode ? "#1E1E1E" : "#fff",
    backgroundGradientFromOpacity: 1,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => isDarkMode 
      ? `rgba(255, 107, 129, ${opacity})` 
      : `rgba(135, 13, 37, ${opacity})`,
    labelColor: (opacity = 1) => isDarkMode 
      ? `rgba(255, 255, 255, ${opacity})` 
      : `rgba(51, 51, 51, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: "5",
      strokeWidth: "2",
      stroke: isDarkMode ? "#FF6B81" : "#870D25"
    },
    fillShadowGradientFrom: isDarkMode ? "#FF6B81" : "#870D25",
    fillShadowGradientTo: isDarkMode ? "rgba(255, 107, 129, 0.2)" : "rgba(135, 13, 37, 0.1)",
    fillShadowGradientOpacity: 0.6,
    decimalPlaces: 0,
    propsForBackgroundLines: {
      strokeDasharray: '',
      strokeWidth: 1,
      stroke: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    },
    propsForLabels: {
      fontSize: isLandscape ? 12 : 10,
      fontWeight: '600',
    },
  }), [isDarkMode, isLandscape]);

  // Process chart data for mobile display with more intelligent adaptation
  const processChartData = useCallback((data) => {
    if (!data || !data.labels) return data;
    
    // For small screens, make more intelligent adjustments
    const screenWidth = Dimensions.get('window').width;
    
    if (screenWidth < 360) {
      // Very small screens: abbreviate month names even more
      return {
        ...data,
        labels: data.labels.map(label => {
          if (typeof label === 'string') {
            return label.substring(0, 1); // Just first letter
          }
          return label;
        })
      };
    } else if (screenWidth < 400 && !isLandscape) {
      // Small screens: abbreviate month names
      return {
        ...data,
        labels: data.labels.map(label => {
          if (typeof label === 'string' && label.length > 3) {
            return label.substring(0, 3);
          }
          return label;
        })
      };
    }
    
    return data;
  }, [isLandscape]);

  // Tab buttons with memoization
  const renderTabButtons = useCallback(() => {
    const tabs = [
      { id: 'donations', title: 'Donations', icon: 'water-drop' },
      { id: 'requests', title: 'Requests', icon: 'assignment' },
      { id: 'analytics', title: 'Analytics', icon: 'pie-chart' }
    ];
    
    return (
      <View style={[
        styles.tabButtonContainer, 
        isDarkMode && styles.darkTabContainer
      ]} accessibilityRole="tablist">
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            title={tab.title}
            isActive={activeTab === tab.id}
            onPress={() => selectTab(tab.id)}
          />
        ))}
      </View>
    );
  }, [activeTab, selectTab, isDarkMode]);

  // Stats cards section with responsive layout
  const renderStatsSection = useCallback(() => {
    const numColumns = isLandscape ? 4 : 2;
    
    return (
      <View style={styles.statsSection}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Key Metrics</Text>
        <FlatList
          data={statsData}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          scrollEnabled={false}
          columnWrapperStyle={[
            styles.statsRow, 
            { justifyContent: numColumns === 4 ? 'space-between' : 'space-between' }
          ]}
          renderItem={({ item }) => (
            <StatsCard
              title={item.title}
              value={item.value}
              icon={item.icon}
              color={item.color}
              trend={item.trend}
            />
          )}
        />
      </View>
    );
  }, [isLandscape, isDarkMode, statsData]);

  // Loading indicator component with smoother animation
  const renderLoadingState = useCallback(() => (
    <View style={[styles.loadingContainer, styles.card, isDarkMode && styles.darkCard]}>
      <ActivityIndicator size="large" color={isDarkMode ? "#FF6B81" : "#870D25"} />
      <Text style={[styles.loadingText, isDarkMode && styles.darkText]}>
        Loading dashboard data...
      </Text>
    </View>
  ), [isDarkMode]);

  // Enhanced chart section based on active tab with improved visuals
  const renderChartSection = useCallback(() => {
    if (isLoading) {
      return renderLoadingState();
    }

    let chartTitle, chartDescription, chartComponent;
    const processedMonthlyDonations = processChartData(monthlyDonations);
    const processedUserGrowth = processChartData(userGrowth);
    
    const { width: chartWidth, height: chartHeight } = chartDimensions;
    
    switch (activeTab) {
      case 'donations':
        chartTitle = 'Monthly Donations';
        chartDescription = 'Tracking blood donation counts over the past 6 months';
        chartComponent = (
          <BarChart
            data={processedMonthlyDonations}
            width={Math.max(chartWidth, 300)}
            height={chartHeight}
            chartConfig={{
              ...chartConfig,
              barPercentage: 0.7,
              formatYLabel: (value) => Math.round(value).toString(),
            }}
            style={styles.chartStyle}
            verticalLabelRotation={isLandscape ? 0 : 30}
            showValuesOnTopOfBars
            fromZero
            yAxisLabel=""
            yAxisSuffix=""
            withInnerLines={true}
            segments={5}
          />
        );
        break;
      case 'requests':
        chartTitle = 'Request Growth';
        chartDescription = 'Tracking blood request trends over time';
        chartComponent = (
          <LineChart
            data={processedUserGrowth}
            width={Math.max(chartWidth, 300)}
            height={chartHeight}
            chartConfig={{
              ...chartConfig,
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: isDarkMode ? "#FF6B81" : "#870D25"
              },
            }}
            bezier
            style={styles.chartStyle}
            verticalLabelRotation={isLandscape ? 0 : 30}
            withInnerLines={true}
            withOuterLines={false}
            withShadow={true}
            yAxisLabel=""
            yAxisSuffix=""
            segments={5}
            formatYLabel={(value) => Math.round(value).toString()}
          />
        );
        break;
      case 'analytics':
        chartTitle = 'Blood Type Distribution';
        chartDescription = 'Distribution of donations by blood type';
        chartComponent = (
          <PieChart
            data={bloodTypes}
            width={Math.max(chartWidth, 300)}
            height={chartHeight}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={isLandscape ? "0" : "15"}
            center={[10, 0]}
            absolute
            hasLegend={true}
            avoidFalseZero
          />
        );
        break;
      default:
        return null;
    }

    return (
      <View style={styles.chartsContainer}>
        <View style={[styles.card, isDarkMode && styles.darkCard]}>
          <Text style={[styles.chartTitle, isDarkMode && styles.darkText]}>{chartTitle}</Text>
          <Text style={[styles.chartDescription, isDarkMode && styles.darkSubtext]}>
            {chartDescription}
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chartScrollContent}
          >
            {chartComponent}
          </ScrollView>
        </View>
      </View>
    );
  }, [
    activeTab, 
    chartDimensions, 
    isLandscape, 
    isLoading, 
    isDarkMode, 
    processChartData, 
    chartConfig, 
    renderLoadingState,
    monthlyDonations,
    userGrowth,
    bloodTypes
  ]);

  // Main render with safe area handling
  return (
    <SafeAreaView style={[
      styles.container, 
      isDarkMode && styles.darkContainer,
      { paddingTop: Platform.OS === 'android' ? insets.top : 0 }
    ]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={isDarkMode ? "#121212" : "#F5F5F7"}
      />
      
      <View style={[styles.header, isDarkMode && styles.darkHeader]}>
        <Text style={[styles.headerTitle, isDarkMode && styles.darkHeaderTitle]}>
          Blood Donation Dashboard
        </Text>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={handleRefresh}
          accessibilityLabel="Refresh dashboard"
          accessibilityRole="button"
        >
          <MaterialIcons 
            name="refresh" 
            size={24} 
            color={isDarkMode ? "#FF6B81" : "#870D25"} 
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#870D25']}
            tintColor={isDarkMode ? '#FF6B81' : '#870D25'}
            progressBackgroundColor={isDarkMode ? "#333" : "#F5F5F7"}
          />
        }
      >
        {renderStatsSection()}
        {renderTabButtons()}
        {renderChartSection()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  darkHeader: {
    backgroundColor: '#1E1E1E',
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#870D25',
  },
  darkHeaderTitle: {
    color: '#FF6B81',
  },
  refreshButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(135, 13, 37, 0.05)',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  tabButtonContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  darkTabContainer: {
    backgroundColor: '#1E1E1E',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#870D25',
    backgroundColor: 'rgba(135, 13, 37, 0.08)',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabButtonText: {
    color: '#870D25',
    fontWeight: '600',
  },
  statsSection: {
    marginTop: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 14,
    color: '#333',
  },
  darkText: {
    color: '#E0E0E0',
  },
  darkSubtext: {
    color: '#AAAAAA',
  },
  statsRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statsCard: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 12,
    width: '48%',
    borderLeftWidth: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  darkCard: {
    backgroundColor: '#1E1E1E',
    borderColor: '#333',
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statsTitle: {
    fontSize: 13,
    color: '#666',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.03)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  chartsContainer: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  chartDescription: {
    fontSize: 13,
    color: '#777',
    marginBottom: 18,
  },
  chartStyle: {
    borderRadius: 8,
    paddingRight: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  chartScrollContent: {
    paddingTop: 5,
    paddingBottom: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    minHeight: 250,
  },
  loadingText: {
    marginTop: 14,
    color: '#666',
    fontSize: 14,
  }
});