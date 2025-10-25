package com.nutrino.carbonfootprint.data.remote.ingestion

import kotlinx.serialization.Serializable

@Serializable
data class IngestEventsResponse(
    val created_events: Int,
    val skipped_duplicates: Int,
    val created_emissions: Int
)
