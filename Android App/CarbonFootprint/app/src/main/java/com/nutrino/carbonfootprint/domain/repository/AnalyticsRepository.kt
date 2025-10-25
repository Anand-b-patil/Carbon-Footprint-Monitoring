package com.nutrino.carbonfootprint.domain.repository

import com.nutrino.carbonfootprint.data.remote.analytics.KpisResponse
import com.nutrino.carbonfootprint.data.remote.analytics.SummaryResponse
import com.nutrino.carbonfootprint.data.remote.analytics.TrendResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import kotlinx.coroutines.flow.Flow

interface AnalyticsRepository {
    suspend fun getKpis(from: String, to: String): Flow<ResultState<KpisResponse>>
    suspend fun getTrend(grain: String, from: String, to: String): Flow<ResultState<List<TrendResponse>>>
    suspend fun getSummary(): Flow<ResultState<SummaryResponse>>
}
