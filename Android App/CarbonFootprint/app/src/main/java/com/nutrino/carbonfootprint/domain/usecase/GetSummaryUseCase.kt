package com.nutrino.carbonfootprint.domain.usecase

import com.nutrino.carbonfootprint.data.remote.analytics.SummaryResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.AnalyticsRepository
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class GetSummaryUseCase @Inject constructor(
    private val analyticsRepository: AnalyticsRepository
) {
    suspend operator fun invoke(): Flow<ResultState<SummaryResponse>> {
        return analyticsRepository.getSummary()
    }
}
