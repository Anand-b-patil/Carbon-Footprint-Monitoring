package com.nutrino.carbonfootprint.domain.repository

import com.nutrino.carbonfootprint.data.state.ResultState
import io.ktor.client.statement.HttpResponse
import kotlinx.coroutines.flow.Flow

interface ReportsRepository {
    suspend fun exportReport(
        from: String,
        to: String
    ): Flow<ResultState<HttpResponse>>
}
