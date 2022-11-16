package com.folaroid.portfolio.api.dto;

import com.folaroid.portfolio.db.entity.Portfolio;
import lombok.*;
import java.time.LocalDateTime;

public class PortfolioDto {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class portfolioRequest{
        private Long pfNo;
        private Long userNo;
        private Integer pfPrivacy;
        private LocalDateTime updatedAt;
        private Long portfolioTemplatesNo;
        private String pfName;

        public Portfolio toEntity(){
            Portfolio portfolio = Portfolio.builder()
                    .pfNo(pfNo)
                    .userNo(userNo)
                    .pfPrivacy(pfPrivacy)
                    .updatedAt(updatedAt)
                    .portfolioTemplatesNo(portfolioTemplatesNo)
                    .pfName(pfName)
                    .build();
            return portfolio;
        }
    }

    @Getter
    public static class Response{
        private Long pfNo;
        private Long userNo;
        private Integer pfPrivacy;
        private LocalDateTime updatedAt;
        //private PortfolioTemplates portfolioTemplates;
        private Long portfolioTemplatesNo;
//        private String pfImageLocation;

        public Response(Portfolio portfolio){
            this.pfNo = portfolio.getPfNo();
            this.userNo = portfolio.getUserNo();
            this.pfPrivacy = portfolio.getPfPrivacy();
            this.updatedAt = portfolio.getUpdatedAt();
            this.portfolioTemplatesNo = portfolio.getPortfolioTemplatesNo();
        }
    }
    @Getter
    @AllArgsConstructor
    public static class PortfolioSimpleDto {
        private Long pfNo;
        private LocalDateTime updated_at;
        private String pfName;

        public PortfolioSimpleDto(Portfolio portfolio) {
            this.pfNo = portfolio.getPfNo();
            this.updated_at = portfolio.getUpdatedAt();
            this.pfName = portfolio.getPfName();
        }
    }

    @Getter
    @AllArgsConstructor
    public static class PortfolioDetailDto {
        private Long pfNo;
        private Long portfolioTemplatesNo;
        private String pfName;

        public PortfolioDetailDto(Portfolio portfolio) {
            this.pfNo = portfolio.getPfNo();
            this.portfolioTemplatesNo = portfolio.getPortfolioTemplatesNo();
            this.pfName = portfolio.getPfName();
        }
    }



    @Getter
    @AllArgsConstructor
    public static class SavePortfolioDto {
        private Long pfNo;
        private Long introNo;

        public SavePortfolioDto(Portfolio portfolio, Long introNo) {
            this.pfNo = portfolio.getPfNo();
            this.introNo = introNo;
        }
    }
    @Getter
    @AllArgsConstructor
    public static class DuplicatePortfolioDto {
        private Long pfNo;

    }

}
