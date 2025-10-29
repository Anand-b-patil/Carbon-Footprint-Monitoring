package com.nutrino.carbonfootprint.domain.repository

import com.nutrino.carbonfootprint.data.remote.emissions.EmissionResponse
import com.nutrino.carbonfootprint.data.remote.emissions.RecomputeEmissionsRequest
import com.nutrino.carbonfootprint.data.remote.emissions.RecomputeEmissionsResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import kotlinx.coroutines.flow.Flow

interface EmissionsRepository {
    suspend fun getEmissions(
        from: String? = null,
        to: String? = null,
        limit: Int? = null,
        offset: Int? = null
    ): Flow<ResultState<List<EmissionResponse>>>

    suspend fun recomputeEmissions(request: RecomputeEmissionsRequest): Flow<ResultState<RecomputeEmissionsResponse>>
}
