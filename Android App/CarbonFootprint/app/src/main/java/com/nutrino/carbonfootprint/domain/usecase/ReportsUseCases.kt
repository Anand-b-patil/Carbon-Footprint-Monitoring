package com.nutrino.carbonfootprint.domain.usecase

import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.ReportsRepository
import io.ktor.client.statement.HttpResponse
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class ExportReportUseCase @Inject constructor(
    private val reportsRepository: ReportsRepository
) {
    suspend operator fun invoke(
        from: String,
        to: String
    ): Flow<ResultState<HttpResponse>> {
        return reportsRepository.exportReport(from, to)
    }
}
