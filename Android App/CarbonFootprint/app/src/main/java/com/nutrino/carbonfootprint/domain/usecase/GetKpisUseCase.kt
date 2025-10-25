package com.nutrino.carbonfootprint.domain.usecase

import com.nutrino.carbonfootprint.data.remote.analytics.KpisResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.AnalyticsRepository
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class GetKpisUseCase @Inject constructor(
    private val analyticsRepository: AnalyticsRepository
) {
    suspend operator fun invoke(from: String, to: String): Flow<ResultState<KpisResponse>> {
        return analyticsRepository.getKpis(from = from, to = to)
    }
}
