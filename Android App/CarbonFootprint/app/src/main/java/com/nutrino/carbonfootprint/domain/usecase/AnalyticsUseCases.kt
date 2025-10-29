package com.nutrino.carbonfootprint.domain.usecase

import com.nutrino.carbonfootprint.data.remote.analytics.TrendResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.AnalyticsRepository
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class GetTrendUseCase @Inject constructor(
    private val analyticsRepository: AnalyticsRepository
) {
    suspend operator fun invoke(
        from: String? = null,
        to: String? = null,
        grain: String? = null
    ): Flow<ResultState<TrendResponse>> {
        return analyticsRepository.getTrend(from, to, grain)
    }
}
